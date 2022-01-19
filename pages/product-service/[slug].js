import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useInView } from 'react-intersection-observer';
import lottie from "lottie-web";
import Sheet, { SheetRef } from 'react-modal-sheet';
import { FaChevronLeft } from 'react-icons/fa';
import Shortform from "./short-form"
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
const tabs1 = {'requirement': 0, 'how-to-apply': 1, 'who-is-this-for': 2 }

const Productservices = (props) => {

  const [isOpen, setOpen] = useState(false);
  const [back, setBack] = useState(true)
  const lottieRef = useRef(null)
  const lottieRef1 = useRef(null)
  const lottieRef2 = useRef(null)
  const [lottieimage, setLottieImage] = useState(lottieRef)
  const [opacity, setOpacity] = useState(1);
  const [snapPoint, setSnapPoint] = useState(0);
  let [initial, setInitial] = useState(0);
  const [value, setValue] = useState(0);

  let easing = [0.175, 0.85, 0.42, 0.96];
  const transition = { duration: 0.5, ease: easing, type: "spring", damping: 10, mass: 0.75, stiffness: 100 };
  const textVariants = {
    initial: { y: 150, opacity: 0, transition: { delay: .3, ...transition }},
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: easing
      }
    },
    exit: { y: 150, opacity: 0, transition: { delay:.5, duration: 1, ease: easing } }
  };

  const theme = useTheme();
  const router = useRouter();
  const [ref, inView ] = useInView({threshold: 0});
  //const { ref, inView, entry } = useInView();
  const [ref1, inView1 ] = useInView();
  const animation = useAnimation();
  const animation1 = useAnimation();
  const productname = Object.keys(router.query).length >=1 ? router.query.slug.replaceAll('-', ' ') : ''

  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const closeModal = (event) => {
    setBack(false)
    setTimeout(function(){
      router.push("/products-offer")
    }, 1000)
  }

  const handleClick = (event) => {
    
    let id = event.target.id.replace(/\D/g, "")
    if(id==0){
      setLottieImage(lottieRef)
      router.push(`${sanitizeUrl()}#requirement`)
    }
    else if(id==1){
      setLottieImage(lottieRef1)
      router.push(`${sanitizeUrl()}#how-to-apply`)
    }
    else {
      setLottieImage(lottieRef2)
      router.push(`${sanitizeUrl()}#who-is-this-for`)
    }
  }

  const sanitizeUrl = () => {
    return router.asPath.replace('#requirement','').replace('#how-to-apply','').replace('#who-is-this-for','')
  }

  const handleChangeIndex = (index) => {
    setValue(index)
    if(index==0) {
      setLottieImage(lottieRef)
      router.push(`${sanitizeUrl()}#requirement`)
    }
    else if(index==1) {
      setLottieImage(lottieRef1)
      router.push(`${sanitizeUrl()}#how-to-apply`)
    }
    else {
      setLottieImage(lottieRef2)
      router.push(`${sanitizeUrl()}#who-is-this-for`)
    }
  };

  const shortForm = (event) => {
    setTimeout(function(){
      setBack(false)
      setOpen(true)
      setInitial(0)
      console.log(router.asPath)
      router.push(`${router.asPath}#short-form`)
    }, 700)
  }

  const onDrag = (event, info) => {

    if (info.offset.y > 500) {
      setTimeout(function(){
        setBack(false)
        router.push("/products-offer")
      }, 1000)
    }
  }

  const onDragUp = (event, info) => {
    if (Math.abs(info.offset.y) > 250) {
      setBack(false)
      setOpen(true)
      setInitial(0)
      //router.push(`${router.query.slug}#short-form`)
      router.push(`${router.asPath}#short-form`)
    }
  }

  const close = () => {
    setBack(true)
    setOpen(false);
  }

  const closeSheet = () => {
    setBack(true)
    setOpen(false)
    setInitial(0)
  }

  return (
    <>
    <AnimatePresence>
    {back && (
      <div className="inset-0 pointer-events-auto" style={{opacity: opacity}}>
      <motion.div className="fixed" initial="initial" animate="animate" exit="exit" drag="y" dragConstraints={{ top: 0, bottom:0 }} onDrag={onDrag} variants={textVariants}>
        <motion.div className="grid fixed z-50 cursor-pointer text-white place-items-center w-full h-12 bg-kapitus text-lg capitalize" onClick={closeModal} initial={{ y: -350, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: .5, ...transition }}}><div className="absolute left-0 pl-6"><FaChevronLeft size="20" /></div>{productname}
        </motion.div>

 
      <div className="pb-10 overflow-y-auto content" style={{ height: '500px'}}>
      <motion.div ref={ref} className="px-7 py-2">
        <span className="text-kapitus font-bold text-3xl">Why Consider A Business Loan?</span>
        <p className="text-xl">Business loans are one of the most versatile forms of business financing available to owners on the market today.  They are available in a large range of sizes, come with an array of payment options and there is no limit on the way you can use the funds for your business. Whether you’re looking to grow, maintain daily operations, or build yourself a cash flow safety net to manage the unexpected, Kapitus can help you build the right loan product for your unique business needs.</p>
      </motion.div>
      <motion.div ref={ref1} className="px-7 py-2">
        <span className="text-kapitus font-bold text-3xl">Business Flexibility</span>
        <p className="text-xl">Kapitus business loans can be used for any business purpose, unlike business loans provided by traditional lenders and the SBA which often have restrictions on use associated with competitive rates and a variety of terms and payment plans available, you have the ability to build out a loan product that is created specifically for your business needs.</p>
      </motion.div>
      <div className="px-7 py-2">
        <span className="text-kapitus font-bold text-3xl">Wallet-Friendly</span>
        <p className="text-xl">Competitive rates mean you might end up paying less than a traditional bank loan, keeping more of your hard-earned revenue in your business account, not ours. With a range of payment terms available, we will work with you to build a payment plan that works with the ebb and flow of your business revenue.</p>
      </div>
      <div className="px-7 py-2">
        <span className="text-kapitus font-bold text-3xl">Time Sensitive</span>
        <p className="text-xl">Additional bandwidth and free time are not a perk that comes with running a small business; so we established an underwriting process that requires minimal documentation for approval. With a range of payment terms available, we will work with you to build a payment plan that works with the ebb and flow of your business revenue.</p>
      </div>
      <div className="px-7 py-2">
        <span className="text-kapitus font-bold text-3xl">Small Business Loan Application Checklist | Updated for 2021</span>
        <p className="text-xl">Building and running a small business is hard. It takes conviction, leadership, sound management and, every so often, a much-needed injection of financing. In both good and lean times businesses are often faced with the decision to pursue some type of financing.</p>
        </div>
      <div className="px-7 pt-2">
        <span className="text-kapitus font-bold text-3xl">Business Loans – What You Need To Know</span>
        <p className="text-xl">Business loans are a great working capital resource, regardless of the current priorities of your business.  Whether your focus is expanding your business, ensuring you have cash reserves for slow periods or unanticipated disruptions, or you’re looking for additional cash flow to help maintain daily operations, you’ll be able to find exactly what you need with a Kapitus Small Business Loan.</p>
      </div>
      </div>
        </motion.div>
        <motion.nav className="fixed bottom-0 inset-x-0 z-10 w-full transition-colors bg-kapitus" drag="y" dragConstraints={{top: 0, bottom:0 }} onDrag={onDragUp}>
          <div className="flex items-center m-auto px-7 py-3">
            <div className="text-white text-base">Own a Small Business?</div>
            <motion.div className="inline-flex text-kapitus items-center bg-white text-blue-700 font-semibold py-2 px-6 pb-3 rounded ml-auto" onClick={shortForm}>APPLY NOW</motion.div>
          </div>
        </motion.nav>
        </div>)}
    </AnimatePresence>
    
    </>
  )
}

export async function getServerSideProps(context) {
  const entryId = context.query.gf_token || ''
  return {
    props:{
      entry_id: entryId, credentials: { user: process.env.PRIVATE_USER, password: process.env.PASSWORD }
    }
  }
}

export default Productservices;