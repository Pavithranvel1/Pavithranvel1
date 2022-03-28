import { getApolloClient } from '../lib/apollo-client';
import { gql } from '@apollo/client'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import CommonCard from '../components/CommonCard';
import Carousel from '../components/Carousel';
import Head from 'next/head';
import LastCTA from '../components/LastCTA';

export default function PageComponent({ ProblemsData }) {
  const baseVar = ProblemsData?.data?.data?.page;
  const cardGroup = [baseVar?.CardRows?.cardGroup1, baseVar?.CardRows?.cardGroup2, ProblemsData.data?.data?.page?.CardRows?.cardGroup3 ]
  const cardGroup1 = [baseVar?.CardRows?.cardGroup4, baseVar?.CardRows?.cardGroup5, baseVar?.CardRows?.cardGroup6 ]
  const cardGroup2 = [baseVar?.CardRows?.cardGroup7, baseVar?.CardRows?.cardGroup8, baseVar?.CardRows?.cardGroup9 ]
  const carousel = [baseVar?.carousel?.carouselGroup1, baseVar?.carousel?.carouselGroup2, baseVar?.carousel?.carouselGroup3]

  return (
    <> 
      <Header
        title={ProblemsData?.data?.data?.generalSettings?.title}
        description={ProblemsData?.data?.data?.generalSettings?.description}
      />
      <Head>
        <title>
          {ProblemsData?.data?.data?.generalSettings?.title} - {ProblemsData?.data?.data?.generalSettings?.description}
        </title>
      </Head>
      <Hero
        indexTitle=''
        title={baseVar?.hero?.bannerHeading}
        bgImage={baseVar?.hero?.desktopBanner?.sourceUrl}
      />

      <CommonCard
          cardMainTitle={baseVar?.CardRows?.cardMainTitle}
          cardData={cardGroup}
          cardData1={cardGroup1}
          cardData2={cardGroup2}
      />

      <Carousel data={carousel} />

       <LastCTA
        title={baseVar?.finalCta?.finalSectionTitle} 
        subtitle={''}
        description={baseVar?.finalCta.finalSectionDescription}
        buttonText={baseVar?.finalCta?.finalSectionButton?.title}
        buttonURL={baseVar?.finalCta?.finalSectionButton?.url}
      />
     
{/*       <main className="content content-single">
        <div className="wrap">
          <div dangerouslySetInnerHTML={{ __html: page?.content() ?? '' }} />
        </div>
      </main> */}
      <Footer copyrightHolder={ProblemsData?.data?.data?.title} />
    </>
  );
}

export async function getStaticProps(context) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
    query ProblemsWeSove {
      generalSettings {
        title
        description
      }
      page(id: "problems-we-solve", idType: URI) {
        title
        hero {
          bannerHeading
          desktopBanner {
            sourceUrl
          }
        }
        CardRows {
          cardMainTitle
          cardGroup1 {
            cardTitle
            cardDescription
            cardButton {
              url
            }
            cardIcon {
              sourceUrl
            }
          }
          cardGroup2 {
            cardTitle
            cardDescription
            cardButton {
              url
            }
            cardIcon {
              sourceUrl
            }
          }
          cardGroup3 {
            cardTitle
            cardDescription
            cardButton {
              url
            }
            cardIcon {
              sourceUrl
            }
          }
        }
        carousel {
          carouselGroup1 {
            carouselImageDesktop {
              sourceUrl
            }
            testimonial
            companyOwnerName
            companyTitle
          }
          carouselGroup2 {
            carouselImageDesktop {
              sourceUrl
            }
            companyTitle
            testimonial
            companyOwnerName
          }
          carouselGroup3 {
            carouselImageDesktop {
              sourceUrl
            }
            testimonial
            companyOwnerName
            companyTitle
          }
        }
        finalCta {
          finalSectionTitle
          finalSectionDescription
          finalSectionButton {
            title
            url
          }
        }
      }
    }`
  });

  return {
    props: {
      ProblemsData: {data},
    },
    revalidate: 1,
  };
}