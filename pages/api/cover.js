import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    // Construct the path to the image in the `public` directory
    const imageName = 'podcast-cover.png';
    // In Vercel, `process.cwd()` is the root of the deployment.
    const filePath = path.resolve('./public', imageName);

    // Get file stats to check for existence and set headers
    const stat = await fs.stat(filePath);

    // Set the appropriate headers
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': stat.size,
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, must-revalidate', // Cache for 1 hour on CDN and client
    });

    // Create a read stream and pipe it to the response
    const readStream = fs.createReadStream(filePath); // fs.createReadStream is fine here
    readStream.pipe(res);

  } catch (error) {
    console.error('Error serving cover image:', error);
    // If the file doesn't exist, fs.stat throws an error with code 'ENOENT'
    if (error.code === 'ENOENT') {
      return res.status(404).json({ error: 'Cover image not found at path: ' + error.path });
    }
    // For other errors, return a 500
    return res.status(500).json({ error: 'Failed to serve cover image.', details: error.message });
  }
}
