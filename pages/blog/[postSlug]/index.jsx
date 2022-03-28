import Head from 'next/head'
import { gql } from '@apollo/client';
import { getApolloClient } from '../../../lib/apollo-client';
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import Hero from "../../../components/Hero"
import styles from '../../../styles/Posts.module.scss'

export default function Post({ post, site }) {
  return (
    <>
    <Header
      title={`title`}
      description={`description`}
    />
    <Head></Head>
    <main>
      <Hero
        bgImage={post?.featuredImage?.node?.sourceUrl} 
      />

      <div className={styles.main}>
        <h1 className={styles.title}>
          { post.title }
        </h1>

        <div className={styles.grid}>
          <div className={styles.content} dangerouslySetInnerHTML={{
            __html: post.content
          }} />
        </div>
      </div>
      </main>
      <Footer copyrightHolder={`title`} />
    </>
  )
}

export async function getStaticProps({ params = {} } = {}) {
  const { postSlug } = params;

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      query PostBySlug($slug: String!) {
        generalSettings {
          title
        }
        postBy(slug: $slug) {
          id
          content
          title
          slug
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    `,
    variables: {
      slug: postSlug
    }
  });

  const post = data?.data.postBy;

  const site = {
    ...data?.data.generalSettings
  }

  return {
    props: {
      post,
      site
    }
  }
}

export async function getStaticPaths() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
        posts(first: 1000) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `,
  });

  const posts = data?.data.posts.edges.map(({ node }) => node);

  return {
    paths: posts.map(({ slug }) => {
      return {
        params: {
          postSlug: slug
        }
      }
    }),
    fallback: false
  }
}