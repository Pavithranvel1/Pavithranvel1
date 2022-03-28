import { gql } from "@apollo/client";
import { getApolloClient } from '../../lib/apollo-client';
import Advancedhero from "../../components/products-services/Advancedhero"
import Intro from "../../components/products-services/Intro"
import Faqs from "../../components/products-services/Faqs"
import Relatedblogs from "../../components/products-services/Relatedblogs"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Head from "next/head";
import Link from "next/link";

export default function ProductPage({ data }) {
  const faqlists = { faq1 : [data?.productsService?.faqSection?.faqGroup1?.faqQuestion, data?.productsService?.faqSection?.faqGroup1?.faqAnswer] }

  return (
    <>
        <Header
      title={`title`}
      description={`description`}
    />
    <Head></Head>
    <main className="content">
      <Advancedhero
        title={data?.productsService?.heroAdvanced?.advancedBannerEditor}
        bgImage={data?.productsService?.heroAdvanced?.desktopBanner?.sourceUrl}
        slug={data?.productsService?.slug}
      />
      {data?.productsService?.intro?.introTitle && 
       <Intro 
        introTitle={data?.productsService?.intro?.introTitle}
        subtitle={data?.productsService?.intro?.introDescription}
      />}
      <div
        className="wrap products_servicesh2"
        dangerouslySetInnerHTML={{ __html: data?.productsService?.edit?.blockSectionBuilderEditor }}
      />
      {data?.productsService?.faqSection?.faqTitle &&
       <Faqs
        faqlists={faqlists}
      />}
      {data?.productsService?.relatedBlogPosts?.relatedBlogEditor && 
      <Relatedblogs
        relatedblogs= {data?.productsService?.relatedBlogPosts}
      />}
        </main>
      <Footer copyrightHolder={`title`} />
    </>
  )
}

export async function getStaticPaths(context) {
  const apolloClient = getApolloClient();
  const ProductData = await apolloClient.query({
    query: gql`
    query ProductsServices {
      productsServices(first: 50) {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
  `
  });
  const products = ProductData?.data?.productsServices?.edges?.map(
    (node) => node
  );

  return {
    paths: products?.map(product => {
      return {
        params: {
          slug: product?.node?.slug,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps(context) {

  const slug = context.params.slug;

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
    query ProductsServices {
      productsService(idType: URI, id: "/products-services/${slug}") {
        title
        heroAdvanced {
          advancedBannerEditor
          desktopBanner {
            sourceUrl
          }
        }
        slug
        intro {
          introTitle
          introDescription
        }
        edit {
          blockSectionBuilderEditor
        }
        faqSection {
          faqGroup1 {
            faqAnswer
            faqQuestion
          }
          faqTitle
        }
        relatedBlogPosts {
          relatedBlogEditor
        }
      }
    }
  `
  });
  return {
    props: {
      data: data?.data,
    },
    revalidate: 1, // 60 seconds
  };
}