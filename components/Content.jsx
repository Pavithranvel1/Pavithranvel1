import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { ContentNav, StaticContent } from "../styles/Home.module.css";

const Content = ({ data }) => {
  const { asPath, pathname } = useRouter();

  return (
    <div className="xs:w-full container px-5 mt-10 mb-10 mx-auto">
      <div className="container">
        <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
          {data?.map((value, key) => (
            <div
              className="cardGrid bg-white overflow-hidden dark:bg-red-100 dark:text-black relative py-10 min-h-min shadow-lg"
              key={key}
            >
              <div className="grid place-items-center w-full text-right">
                {value?.staticSvgIcon?.sourceUrl?.length > 0 && (
                  <Image
                    src={value?.staticSvgIcon?.sourceUrl}
                    width="100"
                    height="100"
                    alt=""
                    objectFit="cover"
                    quality={100}
                  />
                )}
              </div>

              <h2
                className="text-3xl font-semibold text-center my-5 uppercase text-kapitus"
                dangerouslySetInnerHTML={{
                  __html: value?.staticCardTitle,
                }}
              />
              <div className="place-items-center">
                <p
                  className="mb-6 px-5"
                  dangerouslySetInnerHTML={{
                    __html: value?.staticCardContent,
                  }}
                />
              </div>
              {asPath == "/partner" ? (
                <div className="grid place-items-center w-full text-right my-5 absolute bottom-0">
                  <Link
                    href={`/partner/${value?.staticCardTitle
                      .toLowerCase()
                      .replace(" ", "-")}`}
                    passHref
                  >
                    <button>LEARN MORE</button>
                  </Link>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Content;