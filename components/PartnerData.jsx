import React, { useState } from 'react';
import styles from '../styles/PartnerAccordion.module.scss';
import PartnerAccordion from "./PartnerAccordion"
import Image from "next/image"
 
function PartnerData({
  accordianMainTitle,
  accordianMainImage,
  cardGroupImg2,
  cardGroupImg3,
  cardGroupTitle3,
  cardGroupDesc1,
  cardGroupDesc2,
  cardGroupDesc3
}) {
  const [expanded, setExpanded] = useState(0);

  return (
      <div className={styles.wrap}>
      <div className={styles.CardNav}>
      <div className={styles.column}>
        <h2>{accordianMainTitle}</h2>
        <div className={styles.accordionMain}>
        {['sales', 'referral', 'processing'].map((item, i) => <PartnerAccordion key={i} i={(i+1)} question={item} answer={item} expanded={expanded} setExpanded={setExpanded} />)}
        </div>
      </div>
        <div className={styles.column}>
        <div className={styles.card}>

    { accordianMainImage && <Image 
            src={accordianMainImage}
            width={500}
            height={300}
            alt=""
          /> }
        </div>
        </div>
      </div>
       </div>
  );
}

export default PartnerData;
