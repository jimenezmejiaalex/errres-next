import axios from 'axios';
import Head from 'next/head';
import SEO from '../components/SEO';
import useSEO from '../lib/useSEO';

function Informacion({ body, media, introImage, title }) {
    const seoInfo = useSEO('info');
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
            <section>
                {media && <video controls src={`${process.env.NEXT_PUBLIC_SERVER_IMAGES}${media.media_video_file}`}></video>}
            </section>
        </main>
    )
}

export const getServerSideProps = async (ctx) => {
    const { data } = await axios.get(`${process.env.SERVER}/page/4`);
    return {
        props: {
            ...data[0],
        }
    }
}

export default Informacion
