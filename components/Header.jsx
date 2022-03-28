import React, { useState, useEffect } from 'react';
import styles from '../styles/Header.module.scss';
import Link from 'next/link';
import Head from 'next/head';
import { Example } from './MobileMenu/Example';
import Logo from './Logo';
import { useRouter } from "next/router";
import UtmParams from "./UtmParams"

function Header() {
  //const [links, setLinks] = useState({})
  const links = [{label:"Problems we Solve", url: "/problems-we-solve"}, {label:"Products We Offer", url:"/products-we-offer"}, {label: "Partner With Us", url: "/partner"}, {label: "Blog", url: "blog"}, {label: "Fast App", url: "fast-app"}]

  let { asPath } = useRouter();
  let params = UtmParams(asPath)
  const LogoImg = "/images/_Kapitus_Logo_white.webp";
  return (
    <>
      <Head>
      <meta name="theme-color" content="#73b564" />
      </Head>
      <header className={styles.bghead}>
        <div className={styles.wrap}>
          <div className={styles['title-wrap']}> 
              <div className={styles['site-title']}>
                <div className={styles.logoContainer}>  
                  <div className={styles.desktopLogo}><Logo LogoImg={LogoImg} params={params} /></div>
                </div>
              </div>
            </div>
            {/* DESKTOP MENU ITEMS */}
            <div className={styles.menu}>
              <ul>
              {links?.map(link => 
                  <li key={`${link?.label}$-menu`}>
                    <Link href={link.url ?? ''}>
                      <a href={`${link?.url}${params}`}>{link?.label}</a>
                    </Link>
                  </li>
                )}
                <li>
                  <span id="headeroll apply-now">
                      <Link href="/fast-application" passHref>
                        <a className="button">
                          APPLY NOW
                        </a>
                      </Link>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {/* MOBILE MENU ITEMS */}
          <Example /> 
      </header>
    </>
  );
}
export default Header;