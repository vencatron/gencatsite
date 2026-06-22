interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-center justify-between">
      <p className="text-red-800 font-medium">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="px-4 py-2 bg-white text-red-600 text-sm font-medium rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorMessage