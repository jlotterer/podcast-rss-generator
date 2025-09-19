import { drive } from '../../lib/drive';

export default async function handler(req, res) {
  try {
    if (!drive) {
      return res.status(500).json({ error: 'Google Drive client is not initialized.' });
    }

    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!folderId) {
      return res.status(500).json({ error: 'Google Drive folder ID is not configured.' });
    }

    const response = await drive.files.list({
      q: `'${folderId}' in parents and (mimeType contains 'audio/')`,
      fields: 'files(id, name, size, createdTime, webContentLink)',
      orderBy: 'createdTime desc',
    });

    const audioFiles = response.data.files;

    const episodes = audioFiles.map(file => {
      const audioUrl = `/api/play?fileId=${file.id}`; // Use the proxy URL
      const title = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');

      return {
        id: file.id,
        title: title,
        audioUrl: audioUrl,
        pubDate: file.createdTime, // The frontend expects 'pubDate'
        fileSize: file.size,
      };
    });

    // Return the data in the format expected by the frontend
    return res.status(200).json({ episodes });

  } catch (error) {
    console.error('Error fetching episodes for API:', error);
    return res.status(500).json({
      error: 'Failed to fetch episodes',
      details: error.message,
    });
  }
}