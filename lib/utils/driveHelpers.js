/**
 * Utility functions for Google Drive integration
 */

/**
 * Extracts the folder ID from a Google Drive URL or returns the input if it's already an ID
 *
 * Supports multiple URL formats:
 * - https://drive.google.com/drive/folders/FOLDER_ID
 * - https://drive.google.com/drive/u/0/folders/FOLDER_ID
 * - https://drive.google.com/drive/u/1/folders/FOLDER_ID?query=params
 * - Just the folder ID itself
 *
 * @param {string} input - Google Drive URL or folder ID
 * @returns {string} - The extracted folder ID
 * @throws {Error} - If the input is invalid or folder ID cannot be extracted
 */
export function extractDriveFolderId(input) {
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input: must be a non-empty string');
  }

  const trimmed = input.trim();

  // If it's already a folder ID (alphanumeric string without slashes)
  // Typical folder IDs are around 33 characters
  if (!/[\/:]/.test(trimmed) && trimmed.length > 10) {
    return trimmed;
  }

  // Try to extract from various Google Drive URL formats
  const patterns = [
    // https://drive.google.com/drive/folders/FOLDER_ID
    /drive\.google\.com\/drive\/folders\/([a-zA-Z0-9_-]+)/,
    // https://drive.google.com/drive/u/0/folders/FOLDER_ID
    /drive\.google\.com\/drive\/u\/\d+\/folders\/([a-zA-Z0-9_-]+)/,
    // https://drive.google.com/open?id=FOLDER_ID
    /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
    // https://drive.google.com/folderview?id=FOLDER_ID
    /drive\.google\.com\/folderview\?id=([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  // If no pattern matched, check if it looks like a valid folder ID anyway
  // (in case Google changes their URL structure)
  const lastSegment = trimmed.split('/').pop().split('?')[0];
  if (lastSegment && lastSegment.length > 10 && /^[a-zA-Z0-9_-]+$/.test(lastSegment)) {
    return lastSegment;
  }

  throw new Error('Could not extract folder ID from the provided URL or input');
}

/**
 * Validates if a string looks like a valid Google Drive folder ID
 *
 * @param {string} folderId - The folder ID to validate
 * @returns {boolean} - True if it appears to be a valid folder ID
 */
export function isValidDriveFolderId(folderId) {
  if (!folderId || typeof folderId !== 'string') {
    return false;
  }

  // Google Drive folder IDs are typically alphanumeric with hyphens and underscores
  // Usually around 25-40 characters
  const trimmed = folderId.trim();
  return (
    trimmed.length >= 10 &&
    trimmed.length <= 100 &&
    /^[a-zA-Z0-9_-]+$/.test(trimmed)
  );
}

/**
 * Creates a Google Drive folder URL from a folder ID
 *
 * @param {string} folderId - The folder ID
 * @returns {string} - The full Google Drive URL
 */
export function createDriveFolderUrl(folderId) {
  if (!isValidDriveFolderId(folderId)) {
    throw new Error('Invalid folder ID');
  }
  return `https://drive.google.com/drive/folders/${folderId}`;
}
