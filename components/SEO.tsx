import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => {
    const siteTitle = 'Discover Tours - Egyptian Adventures';
    const fullTitle = `${title} | ${siteTitle}`;
    const defaultImage = 'https://images.unsplash.com/photo-1539650116455-29cb533e0308?q=80&w=1200&auto=format&fit=crop';
    const siteUrl = 'https://discovertours.com'; // Replace with actual domain

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || siteUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url || siteUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image || defaultImage} />
        </Helmet>
    );
};

export default SEO;
