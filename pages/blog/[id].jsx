import axios from 'axios';
import { useRouter } from 'next/router'
import React from 'react'
import { useAppContext } from '../../context/state';

function BlogItem({image, images, title, body}) {
    const {breakpointData, height} = useAppContext();
    const {breakpoint} = breakpointData;
    return (
        <section className="flex flex-col justify-center items-center mx-8 md:mx-12 lg:mx-32 xl:mx-56 my-4 shadow bg-gray-100 rounded">
            <img className="max-w-4xl w-full object-cover object-center pb-4 h-64 m-2" style={{height: `${height(breakpoint)}px`}} src={`${process.env.NEXT_PUBLIC_SERVER_IMAGES}${image.media_image}`} alt={title}/>
            <div className="mx-6 md:mx-20 lg:mx-40 flex flex-col justify-center items-center">
                <h2 className=" text-3xl lg:text-4xl text-eden py-4">{title}</h2>
                <div className="text-leather" dangerouslySetInnerHTML={{__html: body}}></div>
                <div className="flex flex-wrap -mx-4">
                    {images.map(item => <img className="p-4" src={`${process.env.NEXT_PUBLIC_SERVER_IMAGES}${item.media_image}`}/>)}
                </div>
            </div>
        </section>
    )
}
export const getServerSideProps = async ({params}) => {
    const {data} = await axios.get(`${process.env.SERVER}/blog/${params.id}`);
    return {
        props:{
            ...data[0]
        }
    }
}

export default BlogItem
