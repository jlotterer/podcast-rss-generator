import { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle2, Image as ImageIcon, AlertCircle } from 'lucide-react';

export default function DriveImageBrowser({ folderId, onSelect, onClose, currentImage }) {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [coverArtCandidates, setCoverArtCandidates] = useState([]);
  const [suggestedCover, setSuggestedCover] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (folderId) {
      fetchImages();
    }
  }, [folderId]);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/drive/images/${folderId}`);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.details || data.error || 'Failed to fetch images from Google Drive');
      }

      const data = await res.json();
      setImages(data.images || []);
      setCoverArtCandidates(data.coverArtCandidates || []);
      setSuggestedCover(data.suggestedCover);

      // Auto-select suggested cover if no current image
      if (data.suggestedCover && !currentImage) {
        setSelectedImage(data.suggestedCover);
      }
    } catch (err) {
      console.error('Error fetching images:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = () => {
    if (selectedImage) {
      onSelect(selectedImage.directLink, selectedImage);
    }
    onClose();
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Select Cover Art</h2>
            <p className="text-sm text-gray-600 mt-1">
              Choose an image from your Google Drive folder
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <span className="ml-3 text-gray-600">Loading images...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                <p className="text-red-600 font-medium">{error}</p>
                <button
                  onClick={fetchImages}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : images.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">No images found in this folder</p>
                <p className="text-sm text-gray-500 mt-1">
                  Upload an image to your Google Drive folder to use as cover art
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Suggested Cover */}
              {suggestedCover && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <h3 className="text-sm font-semibold text-gray-900">
                      Suggested Cover Art
                    </h3>
                  </div>
                  <div
                    onClick={() => handleImageClick(suggestedCover)}
                    className={`relative cursor-pointer rounded-xl overflow-hidden border-4 transition-all ${
                      selectedImage?.id === suggestedCover.id
                        ? 'border-blue-600 shadow-lg'
                        : 'border-green-200 hover:border-green-400'
                    }`}
                    style={{ maxWidth: '200px' }}
                  >
                    <img
                      src={suggestedCover.directLink}
                      alt={suggestedCover.name}
                      loading="lazy"
                      className="w-full h-auto"
                    />
                    {selectedImage?.id === suggestedCover.id && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                      <p className="text-white text-xs font-medium truncate">
                        {suggestedCover.name}
                      </p>
                      <p className="text-white text-xs opacity-75">
                        {suggestedCover.width} × {suggestedCover.height}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* All Images Grid */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  All Images ({images.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map((image) => {
                    const isSelected = selectedImage?.id === image.id;
                    const isCandidate = coverArtCandidates.some(c => c.id === image.id);
                    const isTooSmall = image.width < 300 || image.height < 300;

                    return (
                      <div
                        key={image.id}
                        onClick={() => !isTooSmall && handleImageClick(image)}
                        className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                          isTooSmall
                            ? 'border-gray-200 opacity-50 cursor-not-allowed'
                            : isSelected
                            ? 'border-blue-600 shadow-lg'
                            : isCandidate
                            ? 'border-green-200 hover:border-green-400'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <div className="aspect-square bg-gray-100">
                          <img
                            src={image.directLink}
                            alt={image.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                        {isTooSmall && (
                          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                            <p className="text-white text-xs text-center px-2">
                              Too small<br />
                              (min 300×300)
                            </p>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-1.5">
                          <p className="text-white text-xs truncate">
                            {image.name}
                          </p>
                          <p className="text-white text-xs opacity-75">
                            {image.width} × {image.height}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!loading && !error && images.length > 0 && (
          <div className="p-6 border-t border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {selectedImage ? (
                <>
                  Selected: <span className="font-medium">{selectedImage.name}</span>
                  {' '}({selectedImage.width} × {selectedImage.height})
                </>
              ) : (
                'No image selected'
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSelect}
                disabled={!selectedImage}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Use Selected Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
