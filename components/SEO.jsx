import React from 'react'

function SEO({ title, description, imageUrl, url }) {
    return (
        <>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SERVER_IMAGES}${imageUrl}`} />
        </>
    )
}

export default SEO
