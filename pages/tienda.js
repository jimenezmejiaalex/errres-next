import axios from 'axios';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import Filter from '../components/Filters/Filter';
import Pagination from '../components/Pagination';
import ProductItem from '../components/Product/ProductItem';
import { useAppContext } from '../context/state';
import { PRODUCT_CATEGORY, PRODUCT_PRICE, PRODUCT_SIZE, PRODUCT_TYPE } from '../lib/consts';
import useSEO from '../lib/useSEO';
import { NextSeo } from 'next-seo';


function Tienda({ introImage, title, products, filters }) {
    const [productItems, setProductItems] = useState(products);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const { breakpointData } = useAppContext();
    const { breakpoint } = breakpointData;
    const filterData = (checked, value, filtertype) => {
        let dataFiltered = products;
        if (checked) {
            if (filtertype === PRODUCT_CATEGORY) {
                dataFiltered = dataFiltered.filter(({ categories }) => categories.some(({ name }) => name === value))
            }
            if (filtertype === PRODUCT_SIZE) {
                dataFiltered = dataFiltered.filter(({ sizes }) => sizes.some(({ name }) => name === value))
            }
            if (filtertype === PRODUCT_TYPE) {
                dataFiltered = dataFiltered.filter(({ types }) => types.some(({ name }) => name === value))
            }
        }
        setProductItems([...dataFiltered]);
    }

    function deleteMe(id) {
        setProductItems([...productItems.filter(p => p.id !== id)])
    }

    // Get Current post
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productItems.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (number) => setCurrentPage(number);
    const seoInfo = useSEO('store', `${process.env.NEXT_PUBLIC_SERVER_IMAGES}${introImage.media_image}`);
    return (
        <main>
            <NextSeo
                title={seoInfo.title}
                description={seoInfo.description}
                canonical={seoInfo.url}
                openGraph={{
                    url: seoInfo.url,
                    title: seoInfo.title,
                    description: seoInfo.description,
                    images: [{ url: seoInfo.image },],
                    site_name: 'Errres',
                }}
            />
            <section className="h-64 bg-cover bg-center flex justify-center" style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_IMAGES}${introImage.media_image})` }}>
                <h1 className="top-16 text-6xl self-center text-eden">{title}</h1>
            </section>
            <section className="flex flex-col lg:flex-row mx-8 md:mx-12 lg:mx-32 xl:mx-56 lg:space-x-12">
                {
                    !['mobile', 'tablet'].includes(breakpoint) ?
                        (
                            <div className=" w-1/5">
                                <Filter items={filters} filterData={filterData} />
                            </div>
                        ) :
                        (
                            <div>
                                Filter Mobile
                            </div>
                        )
                }
                <div className="py-4 lg:w-4/5">
                    <h3 className="px-4 text-sm">{`Mostrando ${productItems.length} productos`}</h3>
                    <div className="flex flex-wrap">
                        {currentProducts.map(product => <ProductItem key={`product-item-${product.id}`} {...{ ...product, deleteMe }} />)}
                    </div>
                    <Pagination
                        blogPerPage={productsPerPage}
                        totalBlog={productItems.length}
                        active={currentPage}
                        paginate={paginate} />
                </div>
            </section>
        </main>
    )
}

export const getServerSideProps = async (ctx) => {
    const user = parseCookies(ctx).user;
    const { data } = await axios.get(`${process.env.SERVER}/page/20`, {
        auth: {
            username: process.env.API_USER,
            password: process.env.API_PASS
        }
    });
    const productsData = await axios.get(`${process.env.SERVER}/store`, {
        auth: {
            username: process.env.API_USER,
            password: process.env.API_PASS
        }
    });
    const prices = productsData.data.map(({ price }) => parseInt(price));
    const sizesData = await axios.get(`${process.env.SERVER}/sizes`, {
        auth: {
            username: process.env.API_USER,
            password: process.env.API_PASS
        }
    });
    const typesData = await axios.get(`${process.env.SERVER}/types`, {
        auth: {
            username: process.env.API_USER,
            password: process.env.API_PASS
        }
    });
    const categoriesData = await axios.get(`${process.env.SERVER}/categories`, {
        auth: {
            username: process.env.API_USER,
            password: process.env.API_PASS
        }
    });
    const filters = {
        [PRODUCT_TYPE]: typesData.data.map(({ name }) => name),
        [PRODUCT_SIZE]: sizesData.data.map(({ name }) => name),
        [PRODUCT_CATEGORY]: categoriesData.data.map(({ name }) => name),
        [PRODUCT_PRICE]: [Math.min(...prices), Math.max(...prices)]

    }
    let products = productsData.data.map(product => ({ ...product, image: `${process.env.SERVER_IMAGES}${product.image.media_image}` }));
    if (user) {
        const userData = await axios.get(`${process.env.SERVER}/users/${user}`);
        const { id } = userData.data[0];
        const orderData = await axios.get(`${process.env.SERVER}/order/${id}`, {
            auth: {
                username: process.env.API_USER,
                password: process.env.API_PASS
            }
        });
        const orderProducts = orderData?.data[0]?.products;
        products = orderProducts ? products.filter(product => !orderProducts.some(orderProduct => product.id === orderProduct.id)) : products;
    }
    return {
        props: {
            ...data[0],
            products,
            filters
        }
    }
}
export default Tienda
