import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  LOGO_URL,
  PHONE_RAW,
  REVIEW_COUNT,
  SITE_URL,
  type Faq,
} from './constants';

interface LpSeoProps {
  title: string;
  description: string;
  path: string;
  faqs: Faq[];
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': ['DrivingSchool', 'LocalBusiness'],
  '@id': `${SITE_URL}/#drivingschool`,
  name: 'ABF Fahrschule Potsdam',
  url: SITE_URL,
  telephone: PHONE_RAW,
  email: 'potsdam@fahrschuleabf.de',
  image: `${SITE_URL}${LOGO_URL}`,
  logo: `${SITE_URL}${LOGO_URL}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Tuchmacherstraße 45b',
    addressLocality: 'Potsdam',
    postalCode: '14482',
    addressRegion: 'Brandenburg',
    addressCountry: 'DE',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 52.3906, longitude: 13.0645 },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '12:00',
      closes: '18:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Potsdam' },
    { '@type': 'Place', name: 'Potsdam-Babelsberg' },
    { '@type': 'City', name: 'Werder (Havel)' },
    { '@type': 'City', name: 'Teltow' },
    { '@type': 'City', name: 'Kleinmachnow' },
  ],
  priceRange: '€€',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    bestRating: '5',
    reviewCount: String(REVIEW_COUNT),
  },
};


const LpSeo: React.FC<LpSeoProps> = ({ title, description, path, faqs }) => {
  const url = `${SITE_URL}${path}`;
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:site_name" content="ABF Fahrschule Potsdam" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      <script type="application/ld+json">
        {JSON.stringify({ ...localBusiness, url })}
      </script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
  );
};

export default LpSeo;
