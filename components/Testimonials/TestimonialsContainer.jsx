import React from 'react'
import Item from './Item'

function TestimonialsContainer({ items, title, body }) {
  return (
    <div className="flex flex-col text-center">
      <h1 className="text-4xl font-bold text-eden">{title}</h1>
      <div
        className="text-leather my-4"
        dangerouslySetInnerHTML={{ __html: body }}
      ></div>
      <div className="flex flex-col md:flex-row flex-wrap justify-center content-center">
        {items.map((item, index) => (
          <Item key={`testimonial-item-${index}`} {...item} />
        ))}
      </div>
    </div>
  )
}

export default TestimonialsContainer
