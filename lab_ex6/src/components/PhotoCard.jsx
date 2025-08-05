function PhotoCard({ photo }) {
  const { urls, user, alt_description, likes } = photo

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={urls.small} 
        alt={alt_description || 'Photo'}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <img 
            src={user.profile_image.small} 
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium">{user.name}</span>
        </div>
        <p className="text-gray-600 text-sm mb-2">
          {alt_description || 'Beautiful photo'}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{likes} likes</span>
          <a 
            href={photo.links.html} 
            target="_blank"
            className="text-blue-600 text-sm hover:underline"
          >
            View on Unsplash
          </a>
        </div>
      </div>
    </div>
  )
}

export default PhotoCard
