import React from 'react'

function Item({image, body, name, description}) {
    return (
        <div className="w-full max-w-xs m-10 text-center">
            <img className="object-cover object-center h-64 rounded-full mb-5" src={image} alt={name}/>
            <div className="text-leather" dangerouslySetInnerHTML={{__html: body}}></div>
            <h4 className="font-bold text-eden">{name}</h4>
            <h5 className="text-sm text-gray-700">{description}</h5>
        </div>
    )
}

export default Item
