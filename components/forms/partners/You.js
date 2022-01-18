import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from "react-hook-form";

export default function You({ setData, data }) {

  const router = useRouter()
  const [showMe, setShowMe] = useState(true)

  let preloadedValues = { partner_first_name: localStorage.getItem('partner_first_name') || '', partner_last_name: localStorage.getItem('partner_last_name') || '', partner_title: localStorage.getItem('partner_title') || '' }

  const { register, handleSubmit, trigger, formState: { errors } } = useForm({
    defaultValues: preloadedValues
  });

  const onSubmit = data => {
    console.log(data)

      setShowMe(!showMe)
      setTimeout(() => {
        router.push('/partners/2')
      }, 1000)
  }

  const handleBlur = e => {

    if(e.target.value !== '') {
      setData({ ...data, [e.target.name] : e.target.value})
      localStorage.setItem(e.target.name, e.target.value)
      trigger()
      //setShowMe(!showMe)
      //router.push('/get-started/2')
    }
    else {
      localStorage.removeItem(e.target.name, e.target.value)
    }
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
      <motion.div initial="initial" animate="animate" exit="exit" variants={transVariants} style={{height: '430px'}}>
      {[errors.partner_first_name?.type, errors.partner_last_name?.type, errors.partner_title?.type].includes('required')  && (<div className="font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
        <span className="text-white text-base font-bold">
        There was a problem with your submission. Please review the fields below.</span>
      </div>)}
      <div className="grid justify-items-center py-6">
        <h2 className="text-white center">Sign up for the Kapitus Partner Program!</h2>
      </div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-2 gap-6 mb-4 ${errors ? `gfield-error` : ``}`}>
          <div className='col-span-2 md:col-span-1'>
          <input className="border-solid border-2 border-light-blue-500 h-11 bg-kapitus text-white text-xl p-2 focus:outline-none w-full" {...register("partner_first_name", { required: true })} placeholder="First name" type="text" onBlur={handleBlur} />
          {errors.partner_first_name?.type === 'required' && (<span className="text-formred m-2">First Name is Required</span>)}
          </div>
          <div className='col-span-2 md:col-span-1'>
            <input className="border-solid border-2 border-light-blue-500 h-11 bg-kapitus text-white text-xl p-2 w-full" placeholder="Last name" type="text" {...register("partner_last_name", { required: true })} onBlur={handleBlur} />
            {errors.partner_last_name?.type && <span className="text-formred">Last Name is required</span>}
          </div>
          <div className="col-span-2">
            <input className="border-solid border-2 border-light-blue-500 h-11 bg-kapitus text-white text-xl p-2 w-full" placeholder="Title" type="text" {...register("partner_title", { required: true })} onBlur={handleBlur} />
            {errors.partner_title?.type === 'required' && (<span className="text-formred m-2">Title is Required</span>)}
          </div>
        </div>
        <div className="flex absolute w-full">
          <div className="w-1/2">
          </div>
          <div className="w-1/2 flex justify-end">
           <input className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7" type="submit" value="Next" />
          </div>
        </div>
      </form>
    </motion.div>
    )}
    </AnimatePresence>
  );
}
