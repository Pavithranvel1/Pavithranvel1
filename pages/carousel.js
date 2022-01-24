import React from "react";
import { motion } from 'framer-motion';
import "react-multi-carousel/lib/styles.css";
import { products } from '../components/card/products'
import Link from "next/link";
import style from "../styles/carousel.module.css";

export default function productOffer() {

    //const ref = useRef(null)

    /*useEffect(() => {
        //const element = ref.current
        const onResize = () => {
          //setElementTop(element.getBoundingClientRect().top + window.scrollY || window.pageYOffset)
          //setClientHeight(window.innerHeight)
        }

        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
      }, [])*/

    return (
      
      <motion.div initial="initial" animate="animate">
			<div className="min-w-screen bg-gray-200 flex items-center justify-center">
			<div className="bg-white text-gray-800 shadow-lg overflow-hidden relative flex" style={{ width:"100%" }}>
			<motion.div className="bg-white h-full w-full px-5 pt-6 pb-20 overflow-y-auto cover" style={{background: "linear-gradient(rgba(135, 80, 156, 0.3), rgba(135, 80, 156, 0.3)), url(/images/offer-background.jpg)", backgroundSize:'cover' } }>
			<div className="h-64 text-white items-center justify-center flex">Products We Offer</div>

    <div className={style.slider}>
      <Link href="#slide-1" scroll={false} passHref={true}>
        <a>1</a>
      </Link>
      <Link href="#slide-2" scroll={false} passHref={true}>
        <a>2</a>
      </Link>
      <Link href="#slide-3" scroll={false} passHref={true}>
        <a>3</a>
      </Link>
      <Link href="#slide-4" scroll={false} passHref={true}>
        <a>4</a>
      </Link>
      <Link href="#slide-5" scroll={false} passHref={true}>
        <a>5</a>
      </Link>
    <div className={style.slides}>
    {products.map((product, index) => {
      return (
        <Link key={index} href={`product-we-offer/${product.src}`} passHref={true}>
        <motion.div id={`slide-${index+1}`}>
          <motion.a>
            <motion.img layoutId={`${product.src}`} src={`/images/${product.src}.jpg`} className="rounded-lg h-44" />
            <motion.h3 className="grid text-lg font-bold absolute place-items-center -mt-8 text-white -p-5 z-10 capitalize" layoutId={`header-${product.src}`}>{product.title}</motion.h3>
          </motion.a>
        </motion.div>
        </Link>);
      })}
    </div>
  </div>
  </motion.div>
  </div>
  </div>
  </motion.div>)
}