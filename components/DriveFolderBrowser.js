import { useState, useEffect } from 'react';
import { X, Loader2, Folder, ChevronRight, Home } from 'lucide-react';

export default function DriveFolderBrowser({ onSelect, onClose, currentFolderId }) {
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async (parentId = null) => {
    setLoading(true);
    setError(null);

    try {
      const url = parentId
        ? `/api/drive/folders?parentId=${parentId}`
        : '/api/drive/folders';

      const res = await fetch(url);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.details || data.error || 'Failed to fetch folders from Google Drive');
      }

      const data = await res.json();
      setFolders(data.folders || []);
    } catch (err) {
      console.error('Error fetching folders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
  };

  const handleFolderDoubleClick = (folder) => {
    // Navigate into folder
    setCurrentPath([...currentPath, folder]);
    setSelectedFolder(null);
    fetchFolders(folder.id);
  };

  const handleBreadcrumbClick = (index) => {
    if (index === -1) {
      // Go to root
      setCurrentPath([]);
      setSelectedFolder(null);
      fetchFolders();
    } else {
      // Go to specific folder in path
      const newPath = currentPath.slice(0, index + 1);
      setCurrentPath(newPath);
      setSelectedFolder(null);
      fetchFolders(newPath[newPath.length - 1].id);
    }
  };

  const handleSelect = () => {
    if (selectedFolder) {
      onSelect(selectedFolder.id, selectedFolder);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Select Google Drive Folder</h2>
            <p className="text-sm text-gray-600 mt-1">
              Choose the folder containing your podcast audio files
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2 text-sm overflow-x-auto">
            <button
              onClick={() => handleBreadcrumbClick(-1)}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">My Drive</span>
            </button>
            {currentPath.map((folder, index) => (
              <div key={folder.id} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <button
                  onClick={() => handleBreadcrumbClick(index)}
                  className="hover:text-blue-600 transition-colors truncate max-w-[200px]"
                >
                  {folder.name}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <span className="ml-3 text-gray-600">Loading folders...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <p className="text-red-600 font-medium">{error}</p>
                <button
                  onClick={() => fetchFolders(currentPath[currentPath.length - 1]?.id)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : folders.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Folder className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">No folders in this location</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {folders.map((folder) => {
                const isSelected = selectedFolder?.id === folder.id;
                const isCurrent = currentFolderId === folder.id;

                return (
                  <div
                    key={folder.id}
                    onClick={() => handleFolderClick(folder)}
                    onDoubleClick={() => handleFolderDoubleClick(folder)}
                    className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-2 border-blue-600'
                        : isCurrent
                        ? 'bg-green-50 border-2 border-green-500'
                        : 'border-2 border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <Folder className={`w-5 h-5 flex-shrink-0 ${
                      isSelected ? 'text-blue-600' : isCurrent ? 'text-green-600' : 'text-gray-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${
                        isSelected ? 'text-blue-900' : isCurrent ? 'text-green-900' : 'text-gray-900'
                      }`}>
                        {folder.name}
                      </p>
                      {isCurrent && (
                        <p className="text-xs text-green-600 mt-0.5">Currently selected</p>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {!loading && !error && (
          <div className="p-6 border-t border-gray-200 flex justify-between items-center bg-gray-50">
            <div className="text-sm text-gray-600">
              {selectedFolder ? (
                <>
                  Selected: <span className="font-medium">{selectedFolder.name}</span>
                </>
              ) : (
                'Double-click a folder to open it, single-click to select'
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSelect}
                disabled={!selectedFolder}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Select Folder
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
