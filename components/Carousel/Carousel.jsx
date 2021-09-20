import { useState } from 'react'
import { useAppContext } from '../../context/state'
import Item from './Item'
import { v4 as id } from 'uuid'

function Carousel({ items }) {
  const { height, breakpointData } = useAppContext()
  const [index, setIndex] = useState(0)
  const handleNext = () => {
    const activeSlide = document.querySelector(`.slide-${index}.translate-x-0`)
    activeSlide.classList.remove('translate-x-0')
    activeSlide.classList.add('translate-x-full')
    let nextSlide
    if (index >= items.length - 1) {
      nextSlide = document.querySelector('.slide-0')
      setIndex(0)
    } else {
      nextSlide = activeSlide.nextElementSibling
      setIndex(index + 1)
    }

    if (nextSlide) {
      nextSlide.classList.remove('translate-x-full')
      nextSlide.classList.add('translate-x-0')
    }
  }
  const handleBefore = () => {
    const activeSlide = document.querySelector(`.slide-${index}.translate-x-0`)
    activeSlide.classList.remove('translate-x-0')
    activeSlide.classList.add('translate-x-full')

    let previousSlide
    if (index <= 0) {
      previousSlide = document.querySelector(`.slide-${items.length - 1}`)
      setIndex(items.length - 1)
    } else {
      previousSlide = activeSlide.previousElementSibling
      setIndex(index - 1)
    }
    if (previousSlide) {
      previousSlide.classList.remove('translate-x-full')
      previousSlide.classList.add('translate-x-0')
    }
  }
  return (
    <div className="relative">
      {items.map((item, index) => {
        const transition = 'transition-all ease-in-out duration-1000 transform'
        const active = 'translate-x-0'
        const inActive = 'translate-x-full'
        const propsItem = {
          ...item,
          index,
          classAnimation: `${transition} ${index === 0 ? active : inActive}`
        }
        return <Item key={id()} {...propsItem} />
      })}
      <div
        style={{ marginTop: `${height(breakpointData.breakpoint) - 40}px` }}
        className="flex text-white bg-gray-700 absolute z-20 right-0"
      >
        <svg
          onClick={handleBefore}
          className="hover:bg-gray-600 cursor-pointer"
          width="40"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <svg
          onClick={handleNext}
          className="hover:bg-gray-600 cursor-pointer"
          width="40"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  )
}

export default Carousel
