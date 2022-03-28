import styles from '../styles/partner.module.scss';
import Header from "../components/Header"
//import Footer from "../components/Footer"
import Hero from "../components/products-services/Advancedhero"
import CommonCard from "../components/CommonCard"
import PartnerDatas from "../components/PartnerData"
import { getApolloClient } from '../lib/apollo-client';
import { gql } from '@apollo/client'
import Head from 'next/head';
import LastCTA from '../components/LastCTA';
import useInView from "react-cool-inview";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

export default function PageComponent({ PartnerData }) {
  const baseVar = PartnerData?.data?.data;
  const cardGroup = [baseVar?.page?.CardRows?.cardGroup1, baseVar?.page?.CardRows?.cardGroup2, baseVar?.page?.CardRows?.cardGroup3 ]
  const cardGroup1 = [baseVar?.page?.CardRows?.cardGroup4, baseVar?.page?.CardRows?.cardGroup5, baseVar?.page?.CardRows?.cardGroup6 ]
  const cardGroup2 = [baseVar?.page?.CardRows?.cardGroup7, baseVar?.page?.CardRows?.cardGroup8, baseVar?.page?.CardRows?.cardGroup9 ]

  const { observe, inView } = useInView({
    // Stop observe when the target enters the viewport, so the "inView" only triggered once
    unobserveOnEnter: true,
    // For better UX, we can grow the root margin so the image will be loaded before it comes to the viewport
    rootMargin: "50px",
  });
//console.log(baseVar?.page)
  return (
    <> 
      <Header />
      <Head>
        <title>
          {baseVar?.generalSettings?.title} - {baseVar?.generalSettings?.description}
        </title>
      </Head>
       <main className="content">
      <Hero
        indexTitle=''
        title={baseVar?.page?.hero?.bannerHeading}
        bgImage={baseVar?.page?.hero?.desktopBanner?.sourceUrl}
        slug={baseVar?.page?.slug}
      />

      <section className="containers" ref={observe}>
        {inView && (
      <CommonCard
          cardMainTitle={baseVar?.page?.CardRows?.cardMainTitle}
          cardData={cardGroup}
          cardData1={cardGroup1}
          cardData2={cardGroup2}
      />)}
      </section>

      <section className="containers" ref={observe}>
        {inView && (<>
      <div className={styles.horizontal} />
      <div className={styles.buttonCenter}>
        <a className={styles.buttonLink}>
          <button className={styles.link}>NONE REALLY FIT</button>
        </a>
      </div></>)}
      </section>

      <section className="containers" ref={observe}>
        {inView && (
      <PartnerDatas
      accordianMainTitle={baseVar?.page?.accordion?.accordionMainTitle}
      accordianMainImage={baseVar?.page?.accordion?.accordionMainImage?.sourceUrl}
      />)}
      </section>

      <section className="containers" ref={observe}>
        {inView && (
      <LastCTA
        title={baseVar?.page?.finalCta?.finalSectionTitle} 
        subtitle={''}
        description={baseVar?.page?.finalCta?.finalSectionDescription}
        buttonText={baseVar?.page?.finalCta?.finalSectionButton?.title}
        buttonURL={baseVar?.page?.finalCta?.finalSectionButton?.url}
      />)}
      </section>
      </main>
      <section>{inView && <Footer copyrightHolder={baseVar?.generalSettings?.title} />}</section>
    </>
  );
}

export async function getStaticProps(context) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
    query Partner {
      page(id: "partner", idType: URI) {
        title
        slug
        hero {
          bannerHeading
          desktopBanner {
            sourceUrl
            slug
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
        }
        midwayCta {
          midwayCtaText
        }
        accordion {
          accordionMainTitle
          accordionMainImage {
            sourceUrl
          }
          accordionGroup1 {
            accordionProductTitle
            accordionProductDescription
            accordionProductButtonLink {
              url
            }
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
      PartnerData: { data },
    },
    revalidate: 1,
  };
}