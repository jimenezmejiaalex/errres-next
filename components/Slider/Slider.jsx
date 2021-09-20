import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import Item from './Item'
import { useAppContext } from '../../context/state'

SwiperCore.use([Navigation, Pagination])

function Slider({ items }) {
  const { breakpointData } = useAppContext()
  const { breakpoint } = breakpointData
  const slidesPerView = {
    mobile: 1,
    tablet: 3,
    large: 4,
    desktop: 5
  }[breakpoint]
  const spaceBetween = {
    mobile: 10,
    tablet: 20,
    large: 30,
    desktop: 40
  }[breakpoint]
  return (
    <div>
      <Swiper
        style={{ textAlign: '-webkit-center' }}
        id="main"
        tag="section"
        wrapperTag="ul"
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation
        pagination
      >
        {items.map((item) => {
          return (
            <SwiperSlide key={item.id} tag="li">
              <Item {...item} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Slider
