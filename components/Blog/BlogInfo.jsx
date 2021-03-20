import React from 'react'
import Item from './Item'

function BlogInfo({items}) {
    return (
        <div className="text-center">
            <h1 className="text-4xl py-8 text-eden">Blog</h1>
            <div className="flex flex-col text-left md:flex-row space-x-0 space-y-8 md:space-y-0 md:space-x-12 w-full justify-center">
                {items.map(item => <Item key={`blog-item-${item.id}`} {...item}/>)}
            </div>
        </div>
    )
}

export default BlogInfo
