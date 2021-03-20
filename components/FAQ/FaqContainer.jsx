import React, { useRef } from 'react'
import { useAppContext } from '../../context/state';
import FaqItem from './FaqItem'

function FaqContainer({title, items, media}) {
    const {breakpointData} = useAppContext();
    return (
        <div className="flex flex-col lg:flex-row px-8">
            <div className=" w-full lg:w-1/2 p-5">
                <h1 className="uppercase text-2xl font-bold text-eden">{title}</h1>
                <div className=" py-5">
                    {items.map((item, index) => {
                        const itemProps = {
                            question : item.title,
                            answer: item.body,
                            count: `${ index < 10 ? `0${index + 1}` : index + 1 }`
                        }
                        return <FaqItem key={`faq-item-${item.id}`} {...itemProps}/>
                    })}
                </div>
            </div>
            <div className="w-full lg:w-1/2">
                <div className=" lg:h-full bg-cover bg-center" style={{
                    backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_IMAGES}${media.media_image})`,
                    height: `${'mobile' === breakpointData.breakpoint ? 400 : 'tablet' === breakpointData.breakpoint ? 600 : ''}px`,
                }}></div>
            </div>
        </div>
    )
}

export default FaqContainer
