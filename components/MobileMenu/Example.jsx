import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import styles from '../../styles/Header.module.scss';
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import  Logo  from "../Logo";
import Link from "next/link";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 10,
      restDelta: 0
    }
  }),
  closed: {
    clipPath: "circle(30px at 465px 50px)",
    transition: {
      delay: .2,
      type: "spring",
      stiffness: 500,
      damping:  40
    }
  }
};

export const Example = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const LogoImg = "/images/_Kapitus_Logo_white.webp";

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className="mobile_nav"
    >
      <motion.div className="background" variants={sidebar} />
       <div className={styles.logoContainer}>  <Logo LogoImg={LogoImg} /></div>
      <div className={styles.mobileBtn}>
        <Link href="/fast-application" passHref>APPLY NOW</Link>
      </div>
      <MenuToggle toggle={() => toggleOpen()} />
      <Navigation toggle={() => toggleOpen()}/>
    </motion.div>
  );
};
