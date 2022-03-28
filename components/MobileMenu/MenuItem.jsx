import * as React from 'react'
import { motion, useCycle } from 'framer-motion'
import Link from 'next/link';

// interface MenuItemProps {
//   i: number,
//   MenuLink?: Array<string>,
// }

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -1000 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

//const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF']
const colors = ['#73b564', '#73b564', '#73b564', '#73b564', '#73b564']


export const MenuItem = ({ i, MenuLink1 }) => {
  
  const MenuLink = [{label:'one', url:"/"}, {label:'two', url:"/two"}]
   const style = { border: `1px solid ${colors[i]}` }
  const [isOpen, toggleOpen] = useCycle(false, true);
  
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 0.9 }}
      whileTap={{ scale: 0.95 }}
    > 
      {/* {typeof links != 'string' && ( */}
        <div className='text-placeholder' style={style}>
        
          {MenuLink?.map((value, key)=> (
            <div key={key}>
              {i === key ? (
                // <div> Label</div>
                <>
                  <Link href={value.url ?? ''} >
                    <a href={value.url}>{value?.label}</a>
                  </Link>
                </>
                ) : ( <div></div> )
              }
            </div>
          ))}
        </div>
      {/* )} */}
      {/* <div className='text-placeholder' style={style} /> */}
      <div className='icon-placeholder' style={style} />
    </motion.li>
  )
}
