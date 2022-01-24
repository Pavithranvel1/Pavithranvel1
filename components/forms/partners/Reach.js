import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from "react-hook-form";

export default function Reach({ setData, data }) {

  const router = useRouter()
  const [showMe, setShowMe] = useState(true)

  let partner_program = localStorage.getItem('partner_program') || ''
  
  let preloadedValues = { first_name: localStorage.getItem('partner_company_name') || '', last_name: localStorage.getItem('partner_company_website') || '', title: localStorage.getItem('partner_zip_code') || '' }

  const { register, handleSubmit, trigger, formState: { errors } } = useForm({
    defaultValues: preloadedValues
  });

  const onSubmit = data => {
    console.log(data)
    //setShowMe(!showMe)
    setTimeout(() => {
      //router.push('/partners/4')
    }, 1000)
  }

  const handleClick = (e) => {
    if(e.target.value) {
      setData({...data, [e.target.name] : e.target.value})
      localStorage.setItem(e.target.name, e.target.value)
      trigger()
      setShowMe(!showMe)
      setTimeout(() => {
        router.push('/partners/4')
      }, 1000)
    }
  }

  const handlePrev = () => {
    setShowMe(!showMe)
    setTimeout(() => {
      router.push('/partners/2')
    }, 1000)
  }

  const transition = {
    delay: .9,
    duration: 1,
  };

  const transVariants = {
    initial: { opacity: 1, x: -400, scale: 0.6 },
    animate: { opacity: 1, x: 0, scale: 1, transition: { transition } },
    exit: { opacity: 1, x: 700, transition: { delay: 0.5, duration: 0.9 } }
  };

  return (
    <AnimatePresence>
    {showMe && (
    <motion.div initial="initial" animate="animate" exit="exit" variants={transVariants}>
      {errors.partner_program?.type && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
        <span className="text-white text-base font-bold">
        There was a problem with your submission. Please review the fields below.</span>
      </div>)}
      <div className="grid justify-items-center"><h2 className="text-white center">Sign up for the Kapitus Partner Program!</h2></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`grid grid-cols-1 md:grid-cols-3 ${errors.partner_program?.type ? `gfield-error` : ``}`}>
          <label className={`py-6 text-xl font-bold gfield_label ${errors.partner_program?.type ? `text-formred` : `text-white`}`}>I would like to join the Kapitus Program as a:</label>
          {partners.map((partner, i) =>
            <span className="py-1" key={i}>
              <input type="radio" defaultChecked={partner == partner_program ? `checked`:``} id={partner.replace(' ','')} {...register('partner_program', { required: true })} value={partner} onClick={handleClick} />
              <label htmlFor={partner.replace(' ','')} className={`ml-6 ${errors.partner_program?.type ? `text-formred` : `text-white`}`}>{partner}</label>
            </span>
          )}
          {errors.partner_program?.type === 'required' && (<span className="text-formred m-2">This is Required</span>)}
        </div>
        <div className="flex">
        <div className="w-1/2">
          <button className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
            onClick={e => handlePrev()}
            type="button"
          >Back</button></div>
        <div className="w-1/2 flex justify-end">
        <input className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7" type="submit" value="Next" />
        </div>
        </div>
      </form>
    </motion.div>
    )}</AnimatePresence>
  );
}
