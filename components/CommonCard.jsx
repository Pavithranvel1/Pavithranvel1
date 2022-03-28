import React from 'react';
import styles from '../styles/CommonCard.module.scss';
import Link from 'next/link';
import Image from 'next/image';
 
function CommonCard({
    cardMainTitle,
    cardData,
    cardData1,
    cardData2
}) {

  return (
    <div className={styles.wrap}>
      <h2>{cardMainTitle}</h2>
      {cardData && <div className={styles.CardNav}>
      {cardData.map((item, index)=>(
        <div key={`${index}11`} className={styles.column}>
        <div className={styles.card}>
            {item?.cardIcon?.sourceUrl?.length > 0 && (
              <Link href={`/`} passHref>
              <a><Image
                alt="Mountains"
                src={item?.cardIcon?.sourceUrl}
                layout="intrinsic"
                width={100}
                height={100}
              /></a>
              </Link>
            )}

          <div className={styles.cardTitle}>{item?.cardTitle}</div>
          <div className={styles.cardDesc}>{item?.cardDescription}</div>
           {item?.cardButton?.url && <Link href={item?.cardButton?.url}>
              <a className={styles.link}>
                <button>Learn More</button>
              </a>
          </Link>}
        </div>
        </div>
      ))}
      </div>}
      {cardData1[0]?.cardTitle && <div className={styles.CardNav}>
      {cardData1.map((item, index)=>(
        <div key={`${index}2`} className={styles.column}>
        <div className={styles.card}>
            {item?.cardIcon?.sourceUrl?.length > 0 && (
              <Link href={`/`} passHref>
              <a><Image
                alt="Mountains"
                src={item?.cardIcon?.sourceUrl}
                layout="intrinsic"
                width={100}
                height={100}
              /></a>
              </Link>
            )}

          <div className={styles.cardTitle}>{item?.cardTitle}</div>
          <div className={styles.cardDesc}>{item?.cardDescription}</div>
           {item?.cardButton?.url && <Link href={item?.cardButton?.url}>
              <a className={styles.link}>
                <button>Learn More</button>
              </a>
          </Link>}
        </div>
        </div>
      ))}
      </div>}

      {cardData2[0]?.cardTitle && <div className={styles.CardNav}>
      {cardData2.map((item, index)=>(
        <div key={`${index}3`} className={styles.column}>
        <div className={styles.card}>
            {item?.cardIcon?.sourceUrl?.length > 0 && (
              <Link href={`/`} passHref>
              <a><Image
                alt="Mountains"
                src={item?.cardIcon?.sourceUrl}
                layout="intrinsic"
                width={100}
                height={100}
              /></a>
              </Link>
            )}

          <div className={styles.cardTitle}>{item?.cardTitle}</div>
          <div className={styles.cardDesc}>{item?.cardDescription}</div>
           {item?.cardButton?.url && <Link href={item?.cardButton?.url}>
              <a className={styles.link}>
                <button>Learn More</button>
              </a>
          </Link>}
        </div>
        </div>
      ))}
      </div>}

    </div>
  )
}

export default CommonCard;