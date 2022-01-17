import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Content from "../components/Content";
import { useRouter } from "next/router";
import useSWR from "swr";
import useInView from "react-cool-inview";
import dynamic from "next/dynamic";
import CarouselComponent from "../components/Carousel";
import { contentNav } from "../styles/Home.module.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Footer = dynamic(() => import("../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
export default function Contant({ data }) {
  const { asPath, pathname } = useRouter();

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });

  // const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  const BannerData = data?.ThreeColumnStaticPage?.banner;
  return (
    <>
      <Header />
      <Banner data={BannerData} />
      <div>
        <div ref={observe}>
          {inView && <Content data={data?.ThreeColumnStaticPage?.cards} />}
        </div>
        <div className={contentNav} ref={observe}>
          {inView && <CarouselComponent data={data?.carouselAcf} />}
        </div>
      </div>
      <div ref={observe}>{inView && <Footer />}</div>
    </>
  );
}

export async function getStaticProps() {
  console.log("problems we solve ISR");
  const response = await fetch(
    `https://kap-staging.us//api/page/problems-we-solve`
  );
  const resData = await response.json();

  return {
    props: {
      data: resData,
    },
    revalidate: 10,
  };
}
