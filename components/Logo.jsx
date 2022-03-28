import React from 'react';
import styles from '../styles/Header.module.scss';
import Router, { useRouter } from "next/router";
import Image from 'next/image'
import Link from 'next/link'


const navigateToHome = () => {
  Router.push("/");
}

function Logo({
  
  LogoImg,
  params

}) {
  return (
    <section>
      <Link href={`/${params}`} passHref>
        <a href={`/${params}`}>
          <div
            style={{ backgroundImage: LogoImg ? `url(${LogoImg})` : 'none' }}
            className={styles.logoIcon}
          >
          </div>
        </a>
      </Link>
    </section>
  );
}

export default Logo;
