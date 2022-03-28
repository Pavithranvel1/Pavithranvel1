import * as React from "react";
import { motion, Variants } from "framer-motion";
import { MenuItem } from "./MenuItem";
import styles from '../../styles/Header.module.scss';
import Link from "next/link";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};


export const Navigation = ({ toggle }) => {


  const links = '/index'
  const itemIds = [0, 1, 2, 3, 4];

  return (
    <motion.ul variants={variants} onClick={toggle}>

      {itemIds.map(i => (
        <MenuItem i={i} key={i} MenuLink={links} />
      ))}
      
    </motion.ul>
  ) 
}

