function StepCard({ title, completed, children }) {
  return (
    <div>
      <div className="mb-2">
        <div className="w-10 cursor-pointer h-10 mx-auto rounded-full text-lg text-white flex items-center">
          <span className="text-center text-eden w-full hover:text-eden-400">
            {children}
          </span>
        </div>
      </div>
      <div
        className={`text-xs text-center md:text-base cursor-pointer hover:text-eden-400 ${
          completed ? 'text-eden font-medium' : ''
        }`}
      >
        {title}
        {completed && (
          <div
            className="text-center center cursor-pointer"
            style={{ textAlign: '-webkit-center' }}
          >
            <svg
              width={24}
              height={24}
              className="text-eden hover:text-eden-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

export default StepCard
