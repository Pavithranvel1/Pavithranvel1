import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Content from "../components/Content";
import Accordion from "../components/Accordion";
import { useRouter } from "next/router";
import useSWR from "swr";
import useInView from "react-cool-inview";
import dynamic from "next/dynamic";
import ReactHtmlParser from "react-html-parser";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Footer = dynamic(() => import("../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
export default function Contant() {
  const { asPath, pathname } = useRouter();
  const { observe, inView } = useInView({
    // Stop observe when the target enters the viewport, so the "inView" only triggered once
    unobserveOnEnter: true,
    // For better UX, we can grow the root margin so the image will be loaded before it comes to the viewport
    rootMargin: "50px",
  });


  const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const BannerData = data?.ThreeColumnStaticPage?.banner;
  return (
    <>
      <Header />
      <Banner data={BannerData} />
      <div className="py-10 px-5">
        <div ref={observe}>
          {inView && <Content data={data?.ThreeColumnStaticPage?.cards} />}
        </div>
      </div>
      <section ref={observe} className="w-full">
        <div className="xs:w-full container px-5 mt-10 mb-10 mx-auto">
          <div className="container">
            <div className="xs:grid-cols-1 md:grid grid-cols-2 gap-4">
              <div className="md:w-full mx-auto">
                {data?.accordionData?.accordion?.map((value, key) => (
                  <Accordion
                    title={value.accordionTitle}
                    content={ReactHtmlParser(value.accordionContent)}
                    key={key}
                  />
                ))}
              </div>
              <div className="md:w-full mx-auto ">
                <Image
                  src="/HeroImages_secondarypage_salespartners.jpg"
                  alt=""
                  width="750"
                  height="500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section ref={observe}>
        {inView && (
          <div className="xs:w-full container px-5 mt-10 mb-10 mx-auto">
            {/* {ReactHtmlParser(data?.ThreeColumnStaticPage?.financeSolution)} */}
          </div>
        )}
      </section>
      <section ref={observe}>{inView && <Footer />}</section>
    </>
  );
}
