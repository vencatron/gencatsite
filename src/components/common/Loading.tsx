interface LoadingProps {
  message?: string
}

const Loading = ({ message = 'Loading...' }: LoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
      <p className="text-neutral-500 font-medium">{message}</p>
    </div>
  )
}

export default Loading