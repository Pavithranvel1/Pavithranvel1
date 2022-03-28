import Head from "next/head";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  bgWrap,
  bgText,
  heroDesktopImage,
  heroMobileImage,
} from "../styles/Home.module.css";

export default function Banner({ data }) {
  // console.log(data);
  return (
    <>
      <section className="relative">
        <div className="opacity-40">
          <div className={heroDesktopImage}>
            {data?.staticBannerImage?.sourceUrl?.length > 0 && (
              <Image
                src={data?.staticBannerImage?.sourceUrl}
                width={data?.staticBannerImage?.mediaDetails?.width}
                // height={data?.bannerImage?.mediaDetails?.height}
                height={650}
                layout="responsive"
                objectFit="cover"
                quality={100}
                alt="Kapitus"
                priority
              />
            )}
          </div>
          <div className={heroMobileImage}>
            {data?.staticMobileBannerImage?.sourceUrl?.length > 0 && (
              <Image
                src={data?.staticMobileBannerImage?.sourceUrl}
                width={500}
                height={750}
                layout="responsive"
                objectFit="cover"
                quality={100}
                priority
                alt=""
              />
            )}
          </div>
        </div>
        <div className="container">
          <div className={bgText}>
            <div className="xs:grid grid-cols-1 gap-1 p-3 place-items-center mt-10">
              <div className="text-kapitus mb-10">
                <div className="w-7/12 text-3xl md:text-6xl">
                  {data?.staticBannerTitle}
                </div>
                {/* <div className="text-sm md:text-xl lg:text-2xl text-descGreen my-10">
                  {ReactHtmlParser(data?.staticBannerDescription)}
                </div> */}
                <div
                  className="w-7/12 text-sm md:text-xl lg:text-2xl text-descGreen mt-5"
                  dangerouslySetInnerHTML={{
                    __html: data?.staticBannerDescription,
                  }}
                />
                <div
                  className="xs:text-xs sm:text-lg md:text-xl text-kapitus bannerBtn"
                  dangerouslySetInnerHTML={{
                    __html: data?.staticBannerButton,
                  }}
                />
              </div>

              <div className="xs: hidden sm:hidden md:block ">
                {/* {ReactHtmlParser(frmData)} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}