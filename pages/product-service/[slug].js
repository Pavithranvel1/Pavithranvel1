import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useSpring, animated } from 'react-spring';
import VisibilitySensor from "react-visibility-sensor";
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
const tabs1 = {requirement: 0, 'how-to-apply': 1, 'who-is-this-for': 2 }

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

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

  useEffect(() => {
    localStorage.removeItem('gfshortform')
  }, [])

  useEffect(() => {
    setTimeout(function(){

      if(typeof document.getElementsByClassName("react-modal-sheet-container")[0] == 'undefined'){
        setOpacity(1)
        setBack(true)
        setInitial(0)
        router.push(window.location.pathname + window.location.search )
        //router.push(window.location.pathname)
      }
    }, 1500)
    
    if(typeof document.getElementsByClassName("react-modal-sheet-container")[0] !== 'undefined'){
      let transform = document.querySelector('.react-modal-sheet-container').style.transform
      transform = transform.split(" ");
      if(typeof transform[0] !== 'undefined'){
        
        if(transform){
          transform = transform[0].match(/\(([^)]+)\)/) ? parseInt(transform[0].match(/\(([^)]+)\)/)[1]): ''
        }
        else {
          transform = ''
        }
        if(transform < 210){
          setOpacity(0)
          setBack(false)
        }
        if(transform >= 210 && transform <= 350){
          setOpacity(0.25)
          setBack(true)
        }
        if(transform > 350 && transform <= 900){
          setOpacity(0.45)
          setBack(true)
        }
      }
    }
  }, [snapPoint]);

   useEffect(() => {
    const route = router.query
    if(typeof route.tab !== 'undefined'){
      setValue(tabs1[route.tab])
    }

    if(inView){
      animation.start({
        x:0,
        transition:{
          type:'spring', delay: 0.5, duration: 0.9, bounce: 0.3
        }
      });
    }
    if(!inView) {
      animation.start({ x: '-100vw' });
    }

    if(inView1) {

      animation1.start({
        x:0,
        transition:{
          type: 'spring', delay: 0.5, duration: 0.9, bounce: 0.3
        }
      });

    }
    if(!inView1){
      animation1.start({x:'-100vw'});
    }

    var animDuration = 10000;
    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      type: 'seek',
      animationData: require('../../components/lottie-image/parachute.json')
    });

    const anim1 = lottie.loadAnimation({
      container: lottieRef1.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      initialSegment: [25, 200],
      animationData: require('../../components/lottie-image/ball.json')
    });

    const anim2 = lottie.loadAnimation({
      container: lottieRef2.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      type: 'seek',
      initialSegment: [25, 200],
      animationData: require('../../components/lottie-image/dede.json')
    });

    const animatebodymovin = (duration, scrollY) => {
      const scrollPosition = scrollY;
      const maxFrames = anim.totalFrames;
      const maxFrames1 = anim1.totalFrames;
      const maxFrames2 = anim2.totalFrames;
      const frame = (maxFrames / 100) * (scrollPosition / (duration / 100));
      const frame1 = (maxFrames1 / 100) * ((scrollPosition * 0.7) / (duration / 100));
      const frame2 = (maxFrames2 / 100) * (scrollPosition / (duration / 100));
      
      anim.goToAndStop(frame, true);
      anim1.goToAndStop(frame1, true);
      anim2.goToAndStop(frame2, true);
    }

    const onScroll = (scrollY) => {
      animatebodymovin(animDuration, scrollY);
    };
    
    if(typeof document.getElementsByClassName("content")[0] !== 'undefined'){
      document.getElementsByClassName("content")[0].onscroll = function(){
        onScroll(this.scrollTop);
      }
    }
    return () => {
      anim.destroy();
      anim1.destroy();
      anim2.destroy();
      if(typeof document.getElementsByClassName("content")[0] !== 'undefined'){
        document.getElementsByClassName("content")[0].onscroll = function(){
          onScroll(this.scrollTop);
        }
      }
    }
  }, [router, inView, inView1, animation, animation1]);

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
      <Box sx={{ bgcolor: 'background.paper' }}>
      <div className="inset-0 pointer-events-auto" style={{opacity: opacity}}>
      <motion.div className="fixed" initial="initial" animate="animate" exit="exit" drag="y" dragConstraints={{ top: 0, bottom:0 }} onDrag={onDrag} variants={textVariants}>
        <motion.div className="grid fixed z-50 cursor-pointer text-white place-items-center w-full h-12 bg-kapitus text-lg capitalize" onClick={closeModal} initial={{ y: -350, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: .5, ...transition }}}><div className="absolute left-0 pl-6"><FaChevronLeft size="20" /></div>{productname}
        </motion.div>
        <AppBar position="static" className="pt-12 h-56">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="REQUIREMENT" className="nav-tab" {...a11yProps(0)} onClick={handleClick} />
          <Tab label="HOW TO APPLY" className="nav-tab" {...a11yProps(1)} onClick={handleClick} />
          <Tab label="WHO IS THIS FOR" className="nav-tab" {...a11yProps(2)} onClick={handleClick} />
        </Tabs>
        <div className="grid place-items-center bg-white fixed w-full z-20 mt-16">
          <div key="lottie3" className="float-right w-1/3 xs:w-1/6 md:w-1/6 lottie h-36" ref={lottieimage}></div>
        </div>
      </AppBar>
 
      <div className="pb-10 overflow-y-auto content" style={{ height: '500px'}}>
      <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div><h3 className="text-kapitus font-bold ">Who Should Use A Business Loan?</h3><p className="text-xl mb-5">Qualifying for a business loan through Kapitus is easier than you think! Depending on the amount you are looking to secure, there are minimum criteria that you must meet (perfect credit not required!), including:</p><ul className="py-4 list-disc htitle"><li className="text-lg">YOU MUST HAVE A PERSONAL CREDIT SCORE OF AT LEAST 625.</li><li className="text-lg">YOUR BUSINESS NEEDS TO HAVE BEEN OPERATING FOR AT LEAST TWO YEARS.</li><li className="text-lg">YOU NEED TO HAVE A MINIMUM OF $250,000 IN ANNUAL REVENUE.</li></ul><p className="text-xl">Kapitus financing products vary by state, so business loans may not be available to everyone. Not to worry! We have a product for every business in every state. Please contact a Kapitus Financing Specialist to discuss your particular circumstances.</p></div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div><h2 className="text-kapitus font-bold">How To Apply?</h2><p className="text-xl">The Kapitus business loan application process is quick and painless! It should only take you about 5-10 minutes to get your full application package submitted. Simply fill out our online form, and provide your three most recent bank statements, and…that’s it, you’re done! Once your package has been submitted, a Kapitus Financing Specialist will be in touch with a decision or, when necessary, to learn more about your business. Once approved, your Financing Specialist will work with you to build out terms and a payment plan that works best for your business.</p><button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">APPLY NOW</button></div>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <div className="htitle"><h2 className="text-kapitus font-bold">Who Should Use A Business Loan?</h2><p className="text-xl">Kapitus business loans are available to businesses in almost every industry (though some exclusions do apply) and are useful when unexpected expenses arise. Here are the industries that most frequently use our Business Loans:</p><li className="text-lg">PERSONAL SERVICES</li><li className="text-lg">BUSINESS SERVICES</li><li className="text-lg">GENERAL CONTRACTORS</li><li className="text-lg">RESTAURANTS</li><li className="text-lg">RETAIL</li><li className="text-lg">SPECIALTY TRADES</li></div>
        </TabPanel>
      </SwipeableViews>
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
        </div></Box>)}
    </AnimatePresence>
    <Sheet
        isOpen={isOpen}
        onClose={close}
        snapPoints = {[-1, 0.7, 200, 0]}
        initialSnap={0}
        //onSnap={setSnapPoint}
        onSnap={(snapIndex) => {
          //console.log(window.getElementsByClassName("react-modal-sheet-container")[0])
          setSnapPoint(snapIndex+initial)
          //console.log('> Current snap point index:', initial)
          setInitial(initial + 1)
        }
        }
      >
        <Sheet.Container>
          <Sheet.Content>
          <motion.div className="grid fixed z-50 cursor-pointer text-white place-items-center w-full h-12 bg-kapitus text-lg capitalize" initial={{ y: -350, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: .3, ...transition }}} exit={{ y: -350, opacity: 0, transition: { delay: 0.5, duration: 0.5 }}}>
          <div className="absolute left-0 pl-6" onClick={closeSheet}><FaChevronLeft size="20" /></div>
          Get A Free Quote Today
          </motion.div>
            <Shortform entry_id={props.entry_id || ''} credentials={props.credentials} product={router.query.slug} />
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
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