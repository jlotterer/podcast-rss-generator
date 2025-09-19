import { google } from 'googleapis';

export default async function handler(req, res) {
  // Allow both GET and HEAD requests, reject others
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Set up Google Drive API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_CLIENT_EMAIL}`
      },
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });
    
    const folderId = req.query.folder || process.env.GOOGLE_DRIVE_FOLDER_ID;
    
    if (!folderId) {
      return res.status(400).json({ error: 'Folder ID required' });
    }

    // Get all audio files from the specified folder
    const response = await drive.files.list({
      q: `'${folderId}' in parents and (mimeType contains 'audio/')`,
      fields: 'files(id, name, size, createdTime)',
      orderBy: 'createdTime desc'
    });

    const audioFiles = response.data.files;
    
    // Generate episode data
    const episodes = audioFiles.map((file) => {
      const downloadUrl = `https://drive.google.com/uc?id=${file.id}&export=download`;
      const title = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
      const description = `Episode about ${title.toLowerCase()}`;
      
      return {
        id: file.id,
        title: title,
        description: description,
        audioUrl: downloadUrl,
        publishDate: new Date(file.createdTime),
        fileSizeInBytes: file.size || 0, // Pass the raw size in bytes
        duration: '00:00' // Placeholder: getting real duration is complex
      };
    });

    // Podcast metadata from environment variables
    const podcastMeta = {
      title: process.env.PODCAST_TITLE || 'My NotebookLM Podcast',
      description: process.env.PODCAST_DESCRIPTION || 'AI-generated podcasts from my research',
      author: process.env.PODCAST_AUTHOR || 'Podcast Author',
      email: process.env.PODCAST_EMAIL || 'author@example.com',
      websiteUrl: process.env.PODCAST_WEBSITE || 'https://example.com',
      imageUrl: process.env.PODCAST_IMAGE || ''
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
  const { title, description, author, email, websiteUrl, imageUrl } = podcastMeta;
  
  const episodeItems = episodes.map(episode => {
    // Manually escape ampersands in the URL for XML safety
    const safeAudioUrl = episode.audioUrl.replace(/&/g, '&amp;');

    return `
    <item>
      <title><![CDATA[${episode.title}]]></title>
      <description><![CDATA[${episode.description}]]></description>
      <link>${websiteUrl}</link>
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
    <description><![CDATA[${description}]]></description>
    <link>${websiteUrl}</link>
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
      <link>${websiteUrl}</link>
    </image>
    <itunes:image href="${imageUrl}"/>` : ''}
    <itunes:category text="Technology">
      <itunes:category text="Artificial Intelligence"/>
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