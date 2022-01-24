import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cross  from "../../Accordion/Timesolid";
import { motion, AnimatePresence } from 'framer-motion'

export default function FormCard({ children, currentStep }) {
  const [showMe, setShowMe] = useState(true);
  const router = useRouter();
  let step = ['TELL US ABOUT YOU', 'TELL US about your company', 'Pick your partnership program', 'Tell us how we can reach you']
  
  const handleClick = () => {
    localStorage.setItem('reload', true)
    setShowMe(!showMe)
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }

  useEffect(() => {
    localStorage.setItem('formstep', currentStep)
  }, [currentStep])


  const transition = {
    delay: .9,
    duration: .7
  };
  const transVariants = {
    initial: { opacity: 0, y: '-100%', transition: { transition } },
    animate: { opacity: 1, y: 0, transition: { transition } },
    exit: { opacity: 0, y: "100%", transition: { transition } }
  };

  return (
    <AnimatePresence>
    {showMe && (
      <motion.div initial="initial" animate="animate" exit="exit" variants={transVariants}>
    {currentStep <= 4 && (
      <div className="flex items-center">
        <div className=" text-sm md:text-2xl text-gray-500">Step {currentStep} of 4 - {step[parseInt(currentStep) -1 ]}</div>
        <div className="ml-auto" onClick={handleClick}><Cross className="cross" width={20} fill={"#fff"} /></div>
      </div>
    )}
    {children}
    </motion.div>
      )}
    </AnimatePresence>
  );
}
