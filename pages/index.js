import axios from 'axios';
import { parseCookies } from 'nookies';
import BlogInfo from '../components/Blog/BlogInfo';
import Carousel from '../components/Carousel/Carousel';
import FaqContainer from '../components/FAQ/FaqContainer';
import TestimonialsContainer from '../components/Testimonials/TestimonialsContainer';
import { useAppContext } from '../context/state';
import useSEO from '../lib/useSEO';
import { NextSeo } from 'next-seo';

function Home({ data }) {
  const { breakpointData, height } = useAppContext();
  const caouselItems = data.slides.map(({ id, title, description, buttonText, buttonUrl, imageInfo }) => ({
    id,
    image: `${process.env.NEXT_PUBLIC_SERVER_IMAGES}${imageInfo.media_image}`,
    title,
    description,
    buttonText,
    buttonUrl
  }));
  const blogItems = data.blogData.map(item => (
    {
      ...item,
      image: `${process.env.NEXT_PUBLIC_SERVER_IMAGES}${item.image.media_image}`
    }
  ));
  const testimonialItems = data.testimonialsData.items.map(item => (
    {
      ...item,
      description: item.testimonial_description,
      image: `${process.env.NEXT_PUBLIC_SERVER_IMAGES}${item.testimonial_image.media_image}`
    }
  ));
  const { aboutMedata } = data;
  const seoInfo = useSEO('home', caouselItems[0] ? caouselItems[0].image : '')

  return (
    <main className="flex flex-col">
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
      <section className="" style={{
        marginBottom: `${height(breakpointData.breakpoint)}px`
      }}>
        <Carousel items={caouselItems} />
      </section>
      <div className="mx-8 md:mx-12 lg:mx-32 xl:mx-56">
        <section className="text-center my-12">
          <h1 className="text-4xl text-eden mb-7">Que es ?</h1>
          <div className="text-leather md:mx-20 lg:mx-56 xl:mx-64" dangerouslySetInnerHTML={{ __html: data.body }}></div>
        </section>
        <section>
          <video controls src={`${process.env.NEXT_PUBLIC_SERVER_IMAGES}${data.media.media_video_file}`}></video>
        </section>
        <section className="-mx-8 md:-mx-12 lg:-mx-32 xl:-mx-56 py-10">
          <FaqContainer {...data.faqData} />
        </section>
        <section>
          <TestimonialsContainer
            items={testimonialItems}
            title={data.testimonialsData.title}
            body={data.testimonialsData.body} />
        </section>
        <section>
          <BlogInfo items={blogItems} />
        </section>
        <section className="text-center py-4 flex flex-col justify-center items-center">
          <h2 className="text-4xl text-eden py-4">{aboutMedata.title}</h2>
          <div className="text-leather py-4" dangerouslySetInnerHTML={{ __html: aboutMedata.body }}></div>
          <img className="max-w-sm mt-10 mb-4" src={`${process.env.NEXT_PUBLIC_SERVER_IMAGES}${aboutMedata.image.media_image}`} alt="About me" />
          <h5 className=" text-base font-medium text-eden">{aboutMedata.name}</h5>
        </section>
      </div>
    </main>
  );
}

export const getServerSideProps = async (ctx) => {
  const { user } = parseCookies(ctx);
  const { data } = await axios.get(`${process.env.SERVER}/page/2`);
  const response = await axios.get(`${process.env.SERVER}/slides`);
  const faqData = await axios.get(`${process.env.SERVER}/faq-container/12`);
  const blogData = await axios.get(`${process.env.SERVER}/blog-inicio`);
  const testimonialsData = await axios.get(`${process.env.SERVER}/testimonials/19`);
  const aboutMedata = await axios.get(`${process.env.SERVER}/about-me`);
  return {
    props: {
      data: {
        ...data[0],
        slides: response.data,
        faqData: faqData.data[0],
        blogData: blogData.data,
        testimonialsData: testimonialsData.data[0],
        aboutMedata: aboutMedata.data[0],
      }
    }
  }
}

export default Home;
