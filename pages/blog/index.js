import axios from "axios";
import { useState } from "react";
import Thumbnail from "../../components/Blog/Thumbnail";
import Pagination from "../../components/Pagination";
import useSEO from "../../lib/useSEO";
import { NextSeo } from 'next-seo';

function Blog({ blogData, body, media, introImage, title }) {
    const blogItems = blogData.map(item => (
        {
            ...item,
            image: `${process.env.NEXT_PUBLIC_SERVER_IMAGES}${item.image.media_image}`
        }
    ))
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(2);

    // Get Current post

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogItems.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (number) => setCurrentPage(number);

    const seoInfo = useSEO('blog', `${process.env.NEXT_PUBLIC_SERVER_IMAGES}${introImage.media_image}`);
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
            <section className="text-center my-12">
                <div className="text-leather md:mx-20 lg:mx-56 xl:mx-64" dangerouslySetInnerHTML={{ __html: body }}></div>
            </section>
            <div className="mx-8 md:mx-12 lg:mx-32 xl:mx-56">
                <section className="my-8">
                    {currentBlogs.map((item, index) => <Thumbnail key={`blog-item-${index}`} {...item} />)}
                    <Pagination
                        blogPerPage={blogsPerPage}
                        totalBlog={blogItems.length}
                        active={currentPage}
                        paginate={paginate} />
                </section>
            </div>
        </main>
    )
}

export const getServerSideProps = async (ctx) => {
    const { data } = await axios.get(`${process.env.SERVER}/page/3`, {
        auth: {
            username: process.env.API_USER,
            password: process.env.API_PASS
        }
    });
    const blogData = await axios.get(`${process.env.SERVER}/blog-page`, {
        auth: {
            username: process.env.API_USER,
            password: process.env.API_PASS
        }
    });

    return {
        props: {
            ...data[0],
            blogData: blogData.data
        }
    }
}

export default Blog
