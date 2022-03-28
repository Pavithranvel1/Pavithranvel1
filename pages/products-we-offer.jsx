import { getApolloClient } from '../lib/apollo-client';
import { gql } from '@apollo/client'
import Header from "../components/Header"
import Footer from "../components/Footer"
import Advancedhero from "../components/products-services/Advancedhero"
import CommonCard from "../components/CommonCard"
import Carousel from "../components/Carousel"
import Intro from "../components/products-services/Intro"
import Head from 'next/head';
import LastCTA from '../components/LastCTA';

export default function PageComponent({ ProductsData }) {

  const baseVar = ProductsData?.data?.data;
  const cardGroup = [baseVar?.page?.CardRows?.cardGroup1, baseVar?.page?.CardRows?.cardGroup2, baseVar?.page?.CardRows?.cardGroup3 ]
  const cardGroup1 = [baseVar?.page?.CardRows?.cardGroup4, baseVar?.page?.CardRows?.cardGroup5, baseVar?.page?.CardRows?.cardGroup6]
  const cardGroup2 = [baseVar?.page?.CardRows?.cardGroup7, baseVar?.page?.CardRows?.cardGroup8, baseVar?.page?.CardRows?.cardGroup9]
  const carousel = [baseVar?.page?.carousel?.carouselGroup1, baseVar?.page?.carousel?.carouselGroup2, baseVar?.page?.carousel?.carouselGroup3]

  return (
    <> 
       <Header
        title={baseVar?.generalSettings?.title}
        description={baseVar?.generalSettings?.description}
      />
      <Head>
        <title>
          {baseVar?.generalSettings?.title} - {baseVar?.generalSettings?.description}
        </title>
      </Head>
    <main className="content">     
       <Advancedhero
        title={baseVar?.page?.heroAdvanced?.advancedBannerEditor}
        bgImage={baseVar?.page?.heroAdvanced?.desktopBanner?.sourceUrl}
        slug={baseVar?.page?.slug}
      />

       <Intro 
        introTitle={baseVar?.page?.intro?.introTitle}
        subtitle={baseVar?.page?.intro?.introDescription}
      /> 

      <CommonCard
          cardMainTitle={baseVar?.page?.CardRows?.cardMainTitle}
          cardData={cardGroup}
          cardData1={cardGroup1}
          cardData2={cardGroup2}
      />
      <Carousel data={carousel} />
       <LastCTA
        title={baseVar?.page?.finalCta?.finalSectionTitle} 
        subtitle={''}
        description={baseVar?.page?.finalCta.finalSectionDescription}
        buttonText={baseVar?.page?.finalCta?.finalSectionButton?.title}
        buttonURL={baseVar?.page?.finalCta?.finalSectionButton?.url}
      />
{/*       <main className="content content-single">
        <div className="wrap">
          <div dangerouslySetInnerHTML={{ __html: baseVar?.page?.content() ?? '' }} />
        </div>
        </main>*/} 
      </main>
      <Footer copyrightHolder={baseVar?.generalSettings?.title} />
    </>
  );
}

export async function getStaticProps(context) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
    query ProductsWeOffer {
      page(id: "products-we-offer", idType: URI) {
        title
        slug
        heroAdvanced {
          desktopBanner {
            sourceUrl
            slug
          }
          advancedBannerEditor
        }
        intro {
          introTitle
          introDescription
        }
        carousel {
          carouselGroup1 {
            companyTitle
            carouselImageDesktop {
              sourceUrl
            }
            testimonial
            companyOwnerName
          }
          carouselGroup2 {
            companyTitle
            carouselImageDesktop {
              sourceUrl
            }
            testimonial
            companyOwnerName
          }
          carouselGroup3 {
            companyTitle
            carouselImageDesktop {
              sourceUrl
            }
            testimonial
            companyOwnerName
          }
        }
        CardRows {
          cardGroup1 {
            cardDescription
            cardTitle
            cardIcon {
              sourceUrl
            }
          }
          cardGroup2 {
            cardDescription
            cardTitle
            cardIcon {
              sourceUrl
            }
          }
          cardGroup3 {
            cardDescription
            cardTitle
            cardIcon {
              sourceUrl
            }
          }
          cardGroup4 {
            cardDescription
            cardTitle
            cardIcon {
              sourceUrl
            }
          }
          cardGroup5 {
            cardDescription
            cardTitle
            cardIcon {
              sourceUrl
            }
          }
          cardGroup6 {
            cardDescription
            cardTitle
            cardIcon {
              sourceUrl
            }
          }
          cardGroup7 {
            cardDescription
            cardTitle
            cardIcon {
              sourceUrl
            }
          }
          cardGroup8 {
            cardDescription
            cardTitle
            cardIcon {
              sourceUrl
            }
          }
          cardGroup9 {
            cardDescription
            cardTitle
            cardIcon {
              sourceUrl
            }
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
      generalSettings {
        title
        description
      }
    }`
  });

  return {
    props: {
      ProductsData: { data },
    },
    revalidate: 1,
  };
}