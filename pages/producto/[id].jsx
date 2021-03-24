import axios from 'axios';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import AddToCartButton from '../../components/Product/AddToCartButton';
import { NextSeo } from 'next-seo';
import useSEO from '../../lib/useSEO';

function Product({id, title, body, sumary, categories, colors, images, introImage, price, sizes, productType}) {
    const [currentImage, setCurrentImage] = useState(introImage);
    const seoInfo = useSEO('store');
    return (
        <main className="mx-8 md:mx-12 lg:mx-32 xl:mx-56 flex flex-col lg:flex-row lg:space-x-10">
            <NextSeo
                title={title}
                description={`${body.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 150)}${body.length > 150 ? '...' : ''}`}
                canonical={seoInfo.url}
                openGraph={{
                    url: seoInfo.url,
                    title: title,
                    description: `${body.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 150)}${body.length > 150 ? '...' : ''}`,
                    images: [{ url: `${process.env.NEXT_PUBLIC_SERVER_IMAGES}${introImage}` },],
                    site_name: 'Errres',
                }}
            />
            <div className="w-full lg:max-w-lg h-full overflow-hidden">
                <img className="w-full" src={currentImage} alt={title}/>
                <div className="py-4">
                    <Swiper 
                        scrollbar
                        spaceBetween={5}
                        freeMode="true"
                        slidesPerView={4}
                        id="main"
                        tag="section"
                        wrapperTag="ul">
                        {images.map((image, index) => (
                            <SwiperSlide key={`product-slide-image-${index}`} tag="li">
                                <div className="" onClick={()=> setCurrentImage(image)}>
                                    <img className=" w-full h-full object-cover hover:opacity-50" src={image} alt={title}/>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className=" w-full lg:w-1/2 ">
                <h2 className="text-3xl text-eden font-semibold">{title}</h2>
                <div className="my-4 text-xl text-leather font-bold underline">{`₡ ${parseInt(price)}`}</div>
                <div className="text-leather" dangerouslySetInnerHTML={{__html: sumary}}></div>
                <h3 className=" text-xl text-eden font-semibold py-4">Descripción:</h3>
                <div className="text-leather" dangerouslySetInnerHTML={{__html: body}}></div>
                {
                    productType && productType.length > 0 &&
                    <div className="py-4">
                        <h3 className="text-xl text-eden font-semibold">Tipo de producto:</h3>
                        <ul>
                            {productType.map(({name}) => <li className="text-leather font-bold">{name}</li>)}
                        </ul>
                    </div>
                }
                {
                    sizes && 
                    sizes.length > 0 &&
                    <div className="py-4">
                        <h3 className=" text-xl text-eden font-semibold">Tallas del producto:</h3>
                        <ul>
                            {sizes.map(({name}) => <li className="text-leather">{name}</li>)}
                        </ul>
                    </div>
                }
                {
                    colors && 
                    colors.length > 0 &&
                    <div className="py-4">
                        <h3 className=" text-xl text-eden font-semibold">Colores del producto:</h3>
                        <ul className="flex space-x-2">
                            {colors.map(({name}) => <li className="rounded-full w-5 h-5" style={{backgroundColor: name}}></li>)}
                        </ul>
                    </div>
                }
                {
                    categories &&
                    categories.length > 0 &&
                    <div className="py-4">
                        <h3 className=" text-xl text-eden font-semibold">Categorias:</h3>
                        <ul>
                            {categories.map(({name}) => <li className="text-leather">{name}</li>)}
                        </ul>
                    </div>
                }
                <AddToCartButton item={{introImage, title, id, price}}/>
            </div>
        </main>
    )
}

export const getServerSideProps = async ({params}) => {
    const {data} = await axios.get(`${process.env.SERVER}/product/${params.id}`);
    const productData = data[0];
    return {
        props:{
            ...productData,
            introImage: `${process.env.SERVER_IMAGES}${productData.introImage.media_image}`,
            images: productData.images.map(img => `${process.env.SERVER_IMAGES}${img.media_image}`)
        }
    }
}

export default Product
