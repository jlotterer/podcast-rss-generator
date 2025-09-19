import { google } from 'googleapis';

// This file centralizes the Google Drive API client initialization.

let drive;

try {
  // Ensure environment variables are present before initializing.
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error('GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY environment variables must be set.');
  }

  const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    // The private key is sensitive and should be handled with care.
    // Replacing newlines is necessary when the key is stored as a single-line env var.
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  drive = google.drive({ version: 'v3', auth });
} catch (error) {
  console.error('Failed to initialize Google Drive client:', error.message);
  // If the client fails to initialize, 'drive' will be undefined.
  // API routes using it should handle this case.
}

export { drive };