/**
 * Skeleton loader components for various UI elements
 * Provides visual feedback while content is loading
 */

export const PodcastCardSkeleton = () => (
  <div className="bg-card rounded-2xl shadow-lg overflow-hidden animate-pulse">
    <div className="flex flex-col sm:flex-row">
      {/* Cover Image Skeleton - square on left with rounded corners */}
      <div className="p-3 flex-shrink-0">
        <div className="w-full sm:w-40 aspect-square bg-muted rounded-xl" />
      </div>

      {/* Content Skeleton on right */}
      <div className="flex-1 p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            {/* Title */}
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-2" />
            {/* Description */}
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          </div>
          {/* Menu button */}
          <div className="h-6 w-6 bg-gray-200 rounded ml-4" />
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="h-4 bg-gray-200 rounded w-36" />
          <div className="h-4 bg-gray-200 rounded w-28" />
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
      </div>
    </div>
  </div>
);

export const EpisodeItemSkeleton = () => (
  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200/80 animate-pulse">
    <div className="flex items-center space-x-4">
      {/* Play button skeleton */}
      <div className="w-12 h-12 bg-gray-200 rounded-full" />
      <div>
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-48 mb-2" />
        {/* Date */}
        <div className="h-4 bg-gray-200 rounded w-24" />
      </div>
    </div>
  </div>
);

export const FolderItemSkeleton = () => (
  <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-transparent animate-pulse">
    {/* Folder icon */}
    <div className="w-5 h-5 bg-gray-200 rounded flex-shrink-0" />
    {/* Folder name */}
    <div className="flex-1">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
    </div>
    {/* Chevron */}
    <div className="w-5 h-5 bg-gray-200 rounded flex-shrink-0" />
  </div>
);

export const ImageThumbnailSkeleton = () => (
  <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 animate-pulse">
    <div className="aspect-square bg-gray-200" />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-1.5">
      <div className="h-3 bg-gray-300/50 rounded mb-1" />
      <div className="h-3 bg-gray-300/50 rounded w-2/3" />
    </div>
  </div>
);

export const ProfileSectionSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-6 h-6 bg-gray-200 rounded" />
      <div className="h-6 bg-gray-200 rounded w-32" />
    </div>
    <div className="space-y-4">
      <div>
        <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
        <div className="h-10 bg-gray-200 rounded w-full" />
      </div>
      <div>
        <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
        <div className="h-10 bg-gray-200 rounded w-full" />
      </div>
      <div>
        <div className="h-4 bg-gray-200 rounded w-16 mb-2" />
        <div className="h-10 bg-gray-200 rounded w-full" />
      </div>
    </div>
  </div>
);
