import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    // Construct the path to the image in the `public` directory
    const imageName = 'podcast-cover.png';
    const filePath = path.join(process.cwd(), 'public', imageName);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Cover image not found.' });
    }

    // Get file stats to set headers
    const stat = fs.statSync(filePath);

    // Set the appropriate headers
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': stat.size,
      'Cache-Control': 'public, max-age=3600, must-revalidate', // Cache for 1 hour
    });

    // Create a read stream and pipe it to the response
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);

  } catch (error) {
    console.error('Error serving cover image:', error);
    res.status(500).json({ error: 'Failed to serve cover image.' });
  }
}
