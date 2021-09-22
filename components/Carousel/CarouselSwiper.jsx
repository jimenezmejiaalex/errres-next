// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import { v4 as id } from 'uuid'
import Item from './Item'

import './styles.module.scss'

// import Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper'

// install Swiper modules
SwiperCore.use([Navigation])

const CarouselSwiper = ({ items }) => {
  return (
    <Swiper navigation={true} className="mySwiper">
      {items.map((item, index) => {
        const transition = 'transition-all ease-in-out duration-1000 transform'
        const active = 'translate-x-0'
        const inActive = 'translate-x-full'
        const propsItem = {
          ...item,
          index,
          classAnimation: `${transition} ${index === 0 ? active : inActive}`
        }
        return (
          <SwiperSlide key={id()}>
            <Item {...propsItem} />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default CarouselSwiper
