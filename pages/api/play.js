import { drive } from '../../lib/drive';

export default async function handler(req, res) {
  try {
    if (!drive) { // Check if the Google Drive client initialized correctly
      return res.status(500).json({ error: 'Google Drive client is not initialized.' });
    }

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
    // Google API errors often have a `code` property.
    if (error.code === 404) {
      return res.status(404).json({ error: 'File not found in Google Drive.' });
    }
    return res.status(500).json({ error: 'Failed to stream file.', details: error.message });
  }
}