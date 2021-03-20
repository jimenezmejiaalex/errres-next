import React from 'react'
import Link from 'next/link'

function Item({id, title, image}) {
    return (
        <Link href={`/product/${id}`} className="px-4">
            <div className=" h-48 w-full relative">
                {/* <div className="h-full w-full bg-cover rounded-sm" style={{backgroundImage: `url(${image})`}}/> */}
                <img src={image} className=" w-full h-full object-cover object-center"/>
                <div className="flex px-14 w-full absolute top-20">
                    <div 
                        className="w-full text-center bg-clip-content rounded-lg" 
                        style={{backgroundColor: `rgba(0, 0, 0, 0.4)`}}>
                        <h2 className=" text-2xl font-bold text-white p-2" >{title}</h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Item
