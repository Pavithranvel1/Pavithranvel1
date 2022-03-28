import React from 'react';
import styles from '../styles/Footer.module.scss';
import Signupnewsletter from "./SignUpNewsLetter"
import { useRouter } from "next/router";
import UtmParams from "./UtmParams"
import Link from 'next/link';

function Footer({
  title = ' ',
  description,
}) {

  let { asPath } = useRouter();
  let params = UtmParams(asPath)
  const ColumnOne = [{label:"Media Center", url: "/media-center"}, {label:"Team", url:"/about-us"}, {label: "Events", url: "/events"}, {label: "Success Stories", url: "/success-stories"}, {label: "Developer Documentation", url: "/developer-documentation"}, {label: "Blog", url: "/blog"}]
  const ColumnTwo = [{label:"Revenue Based Financing", url: "revenue-based-financing"}, {label:"Helix Healthcare Financing", url:"helix-healthcare-financing"}, {label: "Business Loans", url: "business-loans"}, {label: "SBA Loans", url: "sba-loans"}, {label: "Line of Credit", url: "line-of-credit"}, {label: "Invoice Factoring", url: "invoice-factoring"}, {label: "Equipment Financing", url: "equipment-financing"}, {label: "Purchase Order Financing", url: "purchase-order-financing"}, {label: "Concierge Services", url: "concierge-services"}]

  const ColumnThree = [{label:'(800) 780-7133', url:"tel:18007807133"}, {label:'Contact Us', url:"/contact-us"}]
  
// function Footer({ copyrightHolder = 'Company Name' }: Props): JSX.Element {
//  const year = new Date().getFullYear();
  return (
 //   <footer className={styles.main}>
//      <div className={styles.wrap}>
//        <p>{`© ${year} ${copyrightHolder}. All rights reserved.`}</p>
//      </div>
//    </footer>
<footer className={styles.footer}>
<div className={styles.wrap}>
  <div className={styles['title-wrap']}>
    <p className={styles['site-title']}>
      <Link href="/">
        <a>{title}</a>
      </Link>
    </p>
 
    {description && <p className={styles.description}>{description}</p>}
  </div>

  <div className={styles.features}>
    <ul>
      <h2 className="title-font font-medium text-kapitus tracking-widest text-sm mb-3">
        <Link href="/about-us" passHref>About Us</Link>
      </h2>
      {ColumnOne?.map((link, _index) => (
        <li key={`${link.label}$-menu`}>
          <Link href={link.url ?? ''}>
            <a href={link.url}>{link.label}</a>
          </Link>
        </li>
      ))}
    </ul>
    <ul>
      <h2 className="title-font font-medium text-kapitus tracking-widest text-sm mb-3">
        <Link href="/products-we-offer" passHref>Products</Link>
      </h2>
      {ColumnTwo?.map((link) => (
        <li key={`${link.label}$-menu`}>
          <Link href={link.url ?? ''}>
            <a href={`/products-services/${link.url}${params}`}>{link.label}</a>
          </Link>
        </li>
      ))}
    </ul>
    <ul>
    <h2 className="title-font font-medium text-kapitus tracking-widest text-sm mb-3">
        <Link href="/contact-us" passHref>Contact Us</Link>
      </h2>
      {ColumnThree?.map((link) => (
        <li key={`${link.label}$-menu`}>
          <Link href={link.url ?? ''}>
            <a href={`${link.uri}${params}`}>{link.label}</a>
          </Link>
        </li>
      ))}
    </ul>
    {/* <ul>
      <li> 
          <h5> Signup For Our Newsletter</h5>
          <input type="text" name="Email" />
      </li>
    </ul> */}
    <div className="xs:text-left md:text-center">
           
 {/*     <h5 className="md: p-5"> Signup For Our Newsletter</h5>
       <input type="text" name="Email" className="p-2" /> 
      <div className="my-5 button"><button>Join Now</button></div> */}
      <Signupnewsletter credentials={`credentials`} />
    </div>
    {/* 
      <li>
        <Link href="https://github.com/wpengine/faustjs">
          <a
            className="button"
            href="https://github.com/wpengine/faustjs">
            GitHub
          </a>
        </Link>
  
      </li>
    */}
  </div>
</div>
</footer>
  );
}

export default Footer;