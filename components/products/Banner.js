import Link from "next/link";
import Image from "next/image";
import {
  bgWrap,
  bgText,
  heroDesktopImage,
  heroMobileImage,
} from "../../styles/Home.module.css";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import CommonShortForm from "../../components/forms/CommonShortForm";

export default function ProductsBanner({ data }) {
  // console.log(data);
  const BannerImg = data?.pageBanner?.sourceUrl;
  const MobileBannerImage = data?.mobileBannerImage?.sourceUrl;
  const BannerList = data?.bannerListItems;

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  const shimmer = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  return (
    <>
      <section className="relative">
        <div className="opacity-40">
          <div className={heroDesktopImage}>
            {data?.pageBanner?.sourceUrl?.length > 0 && (
              <Image
                src={data?.pageBanner?.sourceUrl}
                width={data?.pageBanner?.mediaDetails?.width}
                // height={data?.pageBanner?.mediaDetails?.height}
                height={1150}
                layout="responsive"
                objectFit="cover"
                quality={100}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
                alt=""
              />
            )}
          </div>
          <div className={heroMobileImage}>
            {data?.mobileBannerImage?.sourceUrl?.length > 0 && (
              <Image
                src={data?.mobileBannerImage?.sourceUrl}
                width={500}
                // height={data?.mobileBannerImage?.mediaDetails?.height}
                height={850}
                layout="intrinsic"
                objectFit="cover"
                quality={100}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
                alt=""
              />
            )}
          </div>
        </div>
        <div className="container">
          <div className={bgText}>
            <div className="xs:grid col-auto lg:grid grid-cols-2 gap-1 p-3">
              <div className="text-kapitus mb-10">
                <div className="xs:w-full text-2xl my-5 lg:text-5xl">
                  {data?.pageBannerTitle}
                </div>
                <div
                  className="xs:w-full md: text-lg lg:text-3xl text-green-900"
                  dangerouslySetInnerHTML={{
                    __html: data?.bannerDescription,
                  }}
                />
                <div className="text-kapitus">
                  {BannerList?.map((value, key) => (
                    <div key={key}>
                      <div className="my-2 text-sm md:text-xl ">
                        {value?.title}
                      </div>
                      <div
                        className="text-base leading-8"
                        dangerouslySetInnerHTML={{
                          __html: value?.listsItems,
                        }}
                      />
                    </div>
                  ))}
                  {/* {ReactHtmlParser(data?.bannerButton)} */}
                </div>
              </div>

              <div className="xs: hidden sm: hidden md:block ">
                <CommonShortForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
