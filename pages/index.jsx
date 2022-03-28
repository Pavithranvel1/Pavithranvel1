import React, { useState } from "react";
import Head from "next/head";
import { getApolloClient } from '../lib/apollo-client';
import { gql } from '@apollo/client';
import styles from '../styles/home1.module.scss';
import Hero from "../components/Hero"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Typewriter from "typewriter-effect";
import Script from 'next/script'
import Card from '../components/Card';

export function TypingEffect() {
  const [state] = useState ({
    title: '',
    titleTwo: '',
    titleThree: '',
  })
  return (
    <div className={styles.text}>
      <div className='title'>{state.title}</div>
      <div className='titleTwo'>{state.titleTwo}</div>
      <div className='titleThree'>{state.titleThree}</div>
      <Typewriter
        options={{ 
          autoStart: true,
          loop: true,
          delay: 70,
          strings: [
            "run your business",
            "grow your business",
            "secure your business",
            "renovate",
            "get new equipments",
            "pay my taxes",
            "move to a new locations",
            "purchase inventory",
            "run marketing campaigns",
          ],
        }}
      />
    </div>
  );
}

export default function Home({ HomeData }) {

  return (
    <>
    <Header />
    <Head>
      <title>
          {HomeData?.data?.data?.generalSettings?.title} - {HomeData?.data?.data?.generalSettings?.description}
      </title>
    </Head>
    <main className="content">
      {/* Banner Section Start */}
        <Hero
          indexTitle="Business Loan Financing to:"
          title=''
          subtitle={''}
          buttonText="GET STARTED"
          buttonURL="https://example.com"
          bgImage="/images/headless_hero_background.webp"
          id={styles.home_hero} 
        >
          <TypingEffect />
        </Hero>

        <Card
            cardMainTitle={HomeData?.data?.data?.page?.CardRows?.cardMainTitle} 
            cardGroupImg1={`/images/The-Kapitus-Difference.svg` ?? ''}
            cardGroupTitle1={`THE KAPITUS DIFFERENCE`}
            cardGroupBtn1={`/the-kapitus-difference/` ?? ''}
  
            cardGroupImg2={`/images/Success-On-Every-Corner.svg` ?? ''}
            cardGroupTitle2={`SUCCESS ON EVERY CORNER`}
            cardGroupBtn2={`/success-stories` ?? ''}
  
            cardGroupImg3={`/images/Lets-Grow-Together.svg` ?? ''}
            cardGroupTitle3={`LET’S GROW TOGETHER`}
            cardGroupBtn3={`/problems-we-solve` ?? ''}

        />
        <section className="scriptContainer">
          <div className="reviewSlider">
          <Script src="https://cdn.trustindex.io/loader.js?09a5ee4135268498715860a5eb" />
        
          </div>
        </section>
        </main>
      <Footer copyrightHolder={`title`} />
    </>
  );
}

export async function getStaticProps(context) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
    query Home {
      page(id: "home", idType: URI) {
        id
        content
        title
      }
      generalSettings {
        title
        description
      }
    }`
  });

  return {
    props: {
      HomeData: {data},
    },
    revalidate: 1,
  };
}