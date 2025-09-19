import { google } from 'googleapis';

// Initialize the Google Drive client
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

export default async function handler(req, res) {
  try {
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
      const downloadUrl = `https://drive.google.com/uc?id=${file.id}&export=download`;
      const title = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');

      return {
        id: file.id,
        title: title,
        audioUrl: downloadUrl,
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