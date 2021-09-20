import React, { useState, useRef } from 'react'

function FaqItem({ question, answer, count }) {
  const [open, setOpen] = useState(false)
  const contentElement = useRef()
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex text-leather text-xl items-center relative p-4 cursor-pointer w-full"
      >
        <span className="font-bold pr-3">{count}</span>
        <h3 className="text-base">{question}</h3>
        <div className=" items-center absolute right-0 cursor-pointer">
          {!open && (
            <svg
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
          {open && (
            <svg
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          )}
        </div>
      </button>
      <div
        className="answer h-0 overflow-y-hidden"
        style={{
          height:
            open &&
            contentElement &&
            contentElement.current &&
            contentElement.current.offsetHeight
        }}
      >
        <div
          ref={contentElement}
          className="p-5 bg-leather text-base font-thin text-white"
          dangerouslySetInnerHTML={{ __html: answer }}
        ></div>
      </div>
    </div>
  )
}

export default FaqItem
