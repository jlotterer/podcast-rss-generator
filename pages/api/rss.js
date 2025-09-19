import { drive } from '../../lib/drive';

export default async function handler(req, res) {
  // Allow both GET and HEAD requests, reject others
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    if (!drive) {
      return res.status(500).json({ error: 'Google Drive client is not initialized.' });
    }
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    
    if (!folderId) {
      return res.status(500).json({ error: 'Server configuration error: Google Drive folder ID is not set.' });
    }

    // Get all audio files from the specified folder
    const response = await drive.files.list({
      q: `'${folderId}' in parents and (mimeType contains 'audio/')`,
      fields: 'files(id, name, size, createdTime)',
      orderBy: 'createdTime desc'
    });

    const audioFiles = response.data.files;
    
    // Generate episode data
    const episodes = audioFiles.map(file => {
      const title = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
      const description = `Episode about ${title.toLowerCase()}`;
      
      return {
        id: file.id,
        title: title,
        description: description,
        publishDate: new Date(file.createdTime),
        fileSizeInBytes: file.size || 0, // Pass the raw size in bytes
        duration: '00:00' // Placeholder: getting real duration is complex
      };
    });

    // Determine the base URL for all links in the feed.
    // Use a canonical public URL from environment variables, which is critical for Vercel deployments.
    // Fallback to the request's host, which works for local development.
    let baseUrl = process.env.PODCAST_PUBLIC_URL || `https://${req.headers.host}`;
    // Clean up trailing slashes from the base URL to prevent double slashes.
    baseUrl = baseUrl.replace(/\/$/, '');

    let imageUrl = process.env.PODCAST_IMAGE || '';
    // If the image URL is a local path (e.g., /api/cover), make it absolute.
    if (imageUrl && imageUrl.startsWith('/')) {
      imageUrl = `${baseUrl}${imageUrl}`;
    }

    // Podcast metadata from environment variables
    const podcastMeta = {
      baseUrl: baseUrl, // Pass the calculated base URL to the XML generator
      title: process.env.PODCAST_TITLE || 'My NotebookLM Podcast',
      description: process.env.PODCAST_DESCRIPTION || 'AI-generated podcasts from my research',
      author: process.env.PODCAST_AUTHOR || 'Podcast Author',
      email: process.env.PODCAST_EMAIL || 'author@example.com',
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
      details: error.message 
    });
  }
}

function generateRSSXML(podcastMeta, episodes) {
  const { baseUrl, title, description, author, email, imageUrl } = podcastMeta;
  
  const episodeItems = episodes.map(episode => {
    // Construct the absolute URL for the audio file using the base URL.
    const safeAudioUrl = `${baseUrl}/api/play?fileId=${episode.id}`;

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
    <description><![CDATA[${description.substring(0, 250)}...]]></description>
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