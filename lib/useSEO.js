import { useRouter } from 'next/router';
import React from 'react';
import { PAGES_SEO } from './consts';
export default (page, image = '') => {
    const router = useRouter();
    const { title, description } = PAGES_SEO[page];
    const url = `${process.env.DOMAIN || 'https://www.errres.net'}${router.pathname}`;
    return {
        title,
        description,
        image,
        url
    }
}