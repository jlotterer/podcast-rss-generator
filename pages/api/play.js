import { google } from 'googleapis';

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
    const { fileId } = req.query;

    if (!fileId) {
      return res.status(400).json({ error: 'File ID is required' });
    }

    // Get file metadata to set headers correctly
    const fileMeta = await drive.files.get({
      fileId: fileId,
      fields: 'size, mimeType',
    });

    res.writeHead(200, {
      'Content-Type': fileMeta.data.mimeType || 'audio/mpeg',
      'Content-Length': fileMeta.data.size,
    });

    // Get the file as a readable stream and pipe it to the response
    const driveResponse = await drive.files.get(
      { fileId: fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    driveResponse.data.pipe(res);

  } catch (error) {
    console.error('Error streaming file:', error);
    res.status(500).json({ error: 'Failed to stream file.' });
  }
}