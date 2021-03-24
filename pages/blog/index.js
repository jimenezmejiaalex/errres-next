import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Thumbnail from "../../components/Blog/Thumbnail";
import Pagination from "../../components/Pagination";
import SEO from "../../components/SEO";
import useSEO from "../../lib/useSEO";

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
            <Head>
                <SEO
                    title={seoInfo.title}
                    description={seoInfo.description}
                    imageUrl={seoInfo.image}
                    url={seoInfo.url}
                />
            </Head>
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

export const getStaticProps = async (ctx) => {
    const { data } = await axios.get(`${process.env.SERVER}/page/3`);
    const blogData = await axios.get(`${process.env.SERVER}/blog-page`);

    return {
        props: {
            ...data[0],
            blogData: blogData.data
        }
    }
}

export default Blog
