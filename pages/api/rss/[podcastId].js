import { google } from 'googleapis';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  // Allow both GET and HEAD requests, reject others
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { podcastId } = req.query;

  try {
    // Fetch podcast from database
    const podcast = await prisma.podcast.findUnique({
      where: { id: podcastId },
      include: {
        user: {
          select: {
            googleAccessToken: true,
            googleRefreshToken: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!podcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }

    if (!podcast.isActive) {
      return res.status(404).json({ error: 'Podcast is not active' });
    }

    // Create Google Drive client with user's OAuth tokens
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      access_token: podcast.user.googleAccessToken,
      refresh_token: podcast.user.googleRefreshToken,
    });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    // Get all audio files from the podcast's folder
    const response = await drive.files.list({
      q: `'${podcast.googleDriveFolderId}' in parents and (mimeType contains 'audio/')`,
      fields: 'files(id, name, size, createdTime)',
      orderBy: 'createdTime desc',
    });

    const audioFiles = response.data.files || [];

    // Generate episode data
    const episodes = audioFiles.map(file => {
      const title = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
      const description = `Episode about ${title.toLowerCase()}`;

      return {
        id: file.id,
        title: title,
        description: description,
        publishDate: new Date(file.createdTime),
        fileSizeInBytes: file.size || 0,
        duration: '00:00',
      };
    });

    // Determine the base URL
    let baseUrl = podcast.publicUrl || process.env.PODCAST_PUBLIC_URL || `https://${req.headers.host}`;
    baseUrl = baseUrl.replace(/\/$/, '');

    let imageUrl = podcast.coverImage || process.env.PODCAST_IMAGE || '';
    if (imageUrl && imageUrl.startsWith('/')) {
      imageUrl = `${baseUrl}${imageUrl}`;
    }

    // Podcast metadata
    const podcastMeta = {
      baseUrl: baseUrl,
      podcastId: podcast.id,
      title: podcast.name,
      description: podcast.description || 'Podcast episodes',
      author: podcast.author || podcast.user.name || 'Podcast Author',
      email: podcast.email || podcast.user.email || 'author@example.com',
      imageUrl: imageUrl,
    };

    // Generate RSS XML
    const rssXml = generateRSSXML(podcastMeta, episodes);

    // Set headers for RSS feed
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour

    // For a HEAD request, send status 200 and end without a body
    if (req.method === 'HEAD') {
      return res.status(200).end();
    }

    // For a GET request, send the full XML body
    return res.status(200).send(rssXml);

  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return res.status(500).json({
      error: 'Failed to generate RSS feed',
      details: error.message,
    });
  }
}

function generateRSSXML(podcastMeta, episodes) {
  const { baseUrl, podcastId, title, description, author, email, imageUrl } = podcastMeta;

  const episodeItems = episodes.map(episode => {
    const safeAudioUrl = `${baseUrl}/api/podcasts/${podcastId}/play?fileId=${episode.id}`;

    return `
    <item>
      <title><![CDATA[${episode.title}]]></title>
      <itunes:summary><![CDATA[${episode.description}]]></itunes:summary>
      <link>${baseUrl}</link>
      <guid isPermaLink="false">${episode.id}</guid>
      <pubDate>${episode.publishDate.toUTCString()}</pubDate>
      <enclosure url="${safeAudioUrl}" type="audio/mpeg" length="${episode.fileSizeInBytes}"/>
      <itunes:duration>${episode.duration}</itunes:duration>
      <itunes:explicit>clean</itunes:explicit>
    </item>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title><![CDATA[${title}]]></title>
    <description><![CDATA[${description.substring(0, 250)}${description.length > 250 ? '...' : ''}]]></description>
    <link>${baseUrl}</link>
    <language>en-us</language>
    <copyright>© ${new Date().getFullYear()} ${author}</copyright>
    <managingEditor>${email} (${author})</managingEditor>
    <webMaster>${email} (${author})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Automated Podcast RSS Generator</generator>
    <docs>https://cyber.harvard.edu/rss/rss.html</docs>
    <ttl>60</ttl>
    ${imageUrl ? `
    <image>
      <url>${imageUrl}</url>
      <title><![CDATA[${title}]]></title>
      <link>${baseUrl}</link>
    </image>
    <itunes:image href="${imageUrl}"/>` : ''}
    <itunes:category text="Technology">
      <itunes:category text="Tech News"/>
    </itunes:category>
    <itunes:explicit>clean</itunes:explicit>
    <itunes:author>${author}</itunes:author>
    <itunes:summary><![CDATA[${description}]]></itunes:summary>
    <itunes:owner>
      <itunes:name>${author}</itunes:name>
      <itunes:email>${email}</itunes:email>
    </itunes:owner>
    <itunes:type>episodic</itunes:type>${episodeItems}
  </channel>
</rss>`;
}
