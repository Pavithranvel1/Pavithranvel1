/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Carousel.module.scss';
import Image from 'next/image';
import Slider from 'react-carousel-responsive';
import 'react-carousel-responsive/dist/styles.css';

export default function Carousel({ data }) {

  return (
    <Slider autoplay ={true}>
    {data.map((item, index) => (item?.carouselImageDesktop?.sourceUrl) && 
         <section key={index} className={styles.twoColumn}>
         <div className={styles.col}><Image src={item?.carouselImageDesktop?.sourceUrl}
            width={1000}
              height={800}
              alt={``}/>
         </div>
         <div className={`${styles.col} ${styles.content}`}>
           <span>
             <p className={styles.textContent}>{item?.testimonial}</p>
           </span>
         </div>
       </section>
    )}
    </Slider>
  );
}