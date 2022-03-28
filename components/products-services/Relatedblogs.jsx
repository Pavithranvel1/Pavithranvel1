import React from "react";
import styles from '../../styles/Relatedblogs.module.scss';
import Link from 'next/link'
import Image from 'next/image'
 

function Relatedblogs({
    relatedblogs
}) {



  return (
    <section className={styles.wrap}>
      <div className={styles.outerBorder}><span className={styles.innerBorder}><span className={styles.innerStyle}></span></span></div>
      <div className={styles.content}>
        <div 
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: relatedblogs?.relatedBlogEditor }}
          />
      </div>
    </section>
  );
}
 
export default Relatedblogs;
