import { getApolloClient } from '../../lib/apollo-client';
import Blog from "../../components/blog/BlogData";
import RecentPost from "../../components/blog/RecentBlog"
//import Category from "../../components/blog/Categories"
import Head from 'next/head'
import Link from 'next/link'
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { gql } from '@apollo/client';

import styles from '../../styles/Posts.module.scss'

export default function Home({ page, posts, allposts, recentposts, categories }) {
  const { title, description } = page;
  return (
    <>
    <Header
      title={title}
      description={description}
    />
    <Head></Head>
    <main className="content content-page">
    <div className="blogWrap">
      <div className="blogContainer">
        <Blog
          allPosts={allposts}
          posts={posts}
        // heading="Blog Posters"
          headingLevel="h2"
          postMainTitleLevel="h1"
          postTitleLevel="h1"
          id={styles.post_list}
        />
      </div>
      <div className="blogNav">
        {/* <SearchBlogs /> */}
        <RecentPost recentposts={recentposts} />
{/*         <Category categories={categories} /> */}
      </div>
    </div>
  </main>
      <Footer copyrightHolder={`title`} />
    </>
  )
}

export async function getStaticProps() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
        generalSettings {
          title
          description
        }
        posts(first: 9) {
          edges {
            node {
              id
              excerpt
              title
              slug
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
          }
        }
      }
    `,
  });

  const data1 = await apolloClient.query({
    query: gql`
      {
        generalSettings {
          title
          description
        }
        posts(first: 100) {
          edges {
            node {
              id
              excerpt
              title
              slug
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
          }
        }
      }
    `,
  });

  const data2 = await apolloClient.query({
    query: gql`
      {
        posts(first: 5) {
          edges {
            node {
              id
              excerpt
              title
              slug
            }
          }
        }
      }
    `,
  });

  const data3 = await apolloClient.query({
    query: gql`{
      categories(first: 10) {
        edges {
          node {
            slug
            name
          }
        }
      }
    }`,
  });

  const posts = data?.data.posts.edges.map(({ node }) => node).map(post => {
    return {
      ...post,
      path: `/posts/${post.slug}`
    }
  });

  const allposts = data1?.data.posts.edges.map(({ node }) => node).map(post => {
    return {
      ...post,
      path: `/posts/${post.slug}`
    }
  });

  const recentposts = data2?.data.posts.edges.map(({ node }) => node).map(post => {
    return {
      ...post,
      path: `/posts/${post.slug}`
    }
  });

  const categories = data3?.data.categories.edges.map(({ node }) => node).map(post => {
    return {
      ...post,
      path: `/category/${post.slug}`
    }
  });


  const page = {
    ...data?.data.generalSettings
  }

  return {
    props: {
      page,
      posts,
      allposts,
      recentposts,
      categories
    }
  }
}