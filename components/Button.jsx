import React from 'react'

function Button({ click, text }) {
  return (
    <button
      onClick={click}
      className="bg-eden font-semibold hover:bg-eden-400 py-3 my-4 text-sm text-white uppercase w-full"
    >
      {text}
    </button>
  )
}

export default Button
