function Error({ message, onRetry }) {
  return (
    <div className="text-center py-12">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-md mx-auto">
        <p className="font-bold">Oops! Something went wrong</p>
        <p className="text-sm">{message}</p>
      </div>
      <button 
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  )
}

export default Error
