import { gql } from "@apollo/client";
import { getApolloClient } from "../lib/apollo-client";
import Head from 'next/head';
import Hero from "../components/Hero"
import Header from "../components/Header"
import Footer from "../components/Footer"
import LastCTA from '../components/LastCTA';

export default function PageComponent({ page }) {
  return (
    <>
    <Header
      title={page?.generalSettings?.title}
      description={page?.generalSettings?.description}
    />
    <Head></Head>
    <main>
      <Hero
        title={page?.page?.hero?.bannerHeading}
        bgImage={page?.page?.hero?.desktopBanner?.sourceUrl} 
      />
    </main>
    <Footer copyrightHolder={`title`} />
    </>
  );
}

export async function getStaticPaths(context) {
  const apolloClient = getApolloClient();
  const Pages = await apolloClient.query({
    query: gql`
    query Pages {
      pages(first: 10) {
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
  const page = Pages?.data?.pages?.edges?.map(
    (node) => node
  );

  return {
    paths: page?.map(page => {
      return {
        params: {
          page: page?.node?.slug,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps(context) {

  const page = context.params.page;

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      query Pages {
        page(id: "${page}", idType: URI) {
          hero {
            desktopBanner {
              sourceUrl
              title
              description
            }
            bannerHeading
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
      page: data?.data,
    },
    revalidate: 1, // 60 seconds
  };
}