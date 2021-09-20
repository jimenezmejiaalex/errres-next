import React from 'react'

function StepBar({ fill }) {
  return (
    <div
      className="absolute flex align-center items-center align-middle content-center"
      style={{
        width: 'calc(100% - 2.5rem - 1rem)',
        top: '40%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div
        className={`w-full rounded items-center align-middle align-center flex-1 ${
          fill ? 'bg-eden' : 'bg-gray-200'
        }`}
      >
        <div className="w-0 bg-green-300 py-1 rounded" />
      </div>
    </div>
  )
}

export default StepBar
