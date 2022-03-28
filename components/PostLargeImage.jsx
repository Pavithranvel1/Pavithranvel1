import React from 'react';
import styles from '../styles/PostImage.module.scss';
import Link from 'next/link';
import Image from 'next/image';

function PostLargeImage({
    imageSrcUrl 
}) {
  return (
      <div className={styles.bgContainer}>
      <section
        // eslint-disable-next-line react/jsx-props-no-spreading
        style={{ backgroundImage: imageSrcUrl ? `url(${imageSrcUrl})` : 'none' }}
        className={styles.largeBanner}>
    </section>
    </div>
  );
}
export default PostLargeImage;
