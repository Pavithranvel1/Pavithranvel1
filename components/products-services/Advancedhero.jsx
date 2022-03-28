/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from '../../styles/Advancedhero.module.scss';
import Image from 'next/image'
import CommonShortForm from "../forms/CommonShortForm"
import EquipShortForm from '../forms/EquipShortForm'
import InvoiceShortForm from '../forms/InvoiceShortForm'
 
function Advancedhero({
  title,
  id,
  bgImage,
  slug
}) {
  return (
    <section
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(id && { id })}
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none' }}
      className={styles.hero}>
      
      <div className={styles.wrap}>
        <div className={styles.col}>
         <div
            className=""
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: title ?? '' }}
          />

        </div>
        <div className={styles.col}>        
         {( ['business-loans','helix-healthcare-financing', 'line-of-credit', 'purchase-order-financing', 'revenue-based-financing', 'sba-loans', 'products-we-offer', 'concierge-services'].indexOf(slug) !== -1) && (
          <CommonShortForm />
        )}
        {slug == 'equipment-financing' && <EquipShortForm />}
          {slug == 'invoice-factoring' && <InvoiceShortForm />}
        </div>
      </div>

{/*       <div className={styles.wrap}>
        
        <h1>{title}</h1>
        
        <h2>{subtitle}</h2>
      
        <div className={styles.intro}>
          <div className={styles.children}>{children}</div>
          {buttonText && buttonURL && (
            <p>
              <a href={buttonURL} className="button">
                {buttonText}
              </a>
            </p>
          )}
          {button2Text && button2URL && (
            <p>
              <a href={button2URL} className="button button-secondary">
                {button2Text}
              </a>
            </p>
          )}
        </div>
      </div> */}
    </section>
  );
}

export default Advancedhero;
