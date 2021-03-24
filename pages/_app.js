import '../styles/globals.css';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import axios from 'axios';
import Logo from '../components/Logo';
import { useEffect, useState } from 'react';
import { AppWrapper } from '../context/state';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Router from 'next/router';
import Loading from '../components/Loading';
import { parseCookies } from 'nookies';

function MyApp({ Component, pageProps, general }) {
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [loading, setLoading] = useState(false);
  const classes = 'shadow';

  Router.events.on('routeChangeStart', () => setLoading(true));
  Router.events.on('routeChangeComplete', () => setLoading(false));
  Router.events.on('routeChangeError', () => setLoading(false));

  useEffect(() => {
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  return (
    <AppWrapper general={general}>
      <div style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_IMAGES}${general.background.media_image})` }}>
        <div className={`sticky top-0 ${scrollTop !== 0 ? classes : ''} z-50`} style={{ backgroundColor: "white" }}>
          <div className="flex place-content-between items-center my-10 mx-8 md:mx-12 lg:mx-32 xl:mx-56">
            <Logo />
            <div className="flex items-baseline lg:space-x-16">
              <Header />
            </div>
          </div>
        </div>
        {loading && <Loading />}
        <div className={`my-10 overflow-hidden ${loading ? 'opacity-75' : ''}`}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </AppWrapper>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  const { data } = await axios.get(
    `${process.env.SERVER}/general`,
    {
      auth: {
        username: process.env.API_USER,
        password: process.env.API_PASS
      }
    }
  );
  const currencydata = await axios.get('https://tipodecambio.paginasweb.cr/api');
  const user = parseCookies(ctx).user;
  let order;
  if (user) {
    const userData = await axios.get(`${process.env.SERVER}/users/${user}`);
    const { id } = userData.data[0];
    const orderData = await axios.get(`${process.env.SERVER}/order/${id}`, {
      auth: {
        username: process.env.API_USER,
        password: process.env.API_PASS
      }
    });
    const promises = orderData.data[0]?.products.map(product => axios.get(`${process.env.SERVER}/store/${product.id}`, {
      auth: {
        username: process.env.API_USER,
        password: process.env.API_PASS
      }
    }));
    const cart = promises ? await Promise.all(promises).then((values) => values.map(({ data }) => ({ ...data[0], image: `${process.env.SERVER_IMAGES}${data[0].image.media_image}` }))) : [];
    order = {
      ...orderData.data[0],
      products: cart,
    }
  }

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const initialProps = {
    ...data[0],
    tipoCambio: currencydata.data,
    order
  }
  return {
    general: initialProps,
  }
}
export default MyApp
