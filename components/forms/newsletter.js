import React, { useRef } from 'react'
import { useRouter } from "next/router";
import axios from 'axios';
import { motion } from 'framer-motion'
import { useForm } from "react-hook-form"
import { newsletterForm } from '../variables/data'
import { Base64 } from 'js-base64'

const Newsletter = ( { credentials } ) => {
  const router = useRouter()
  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm();
  const key = useRef()
  const [random, setRandom] = useState(Math.random().toString(36).substr(2, 6))
  const auth = Base64.btoa(`${credentials.user}:${credentials.password}`);
  let config = { headers: { 'authorization': `${auth}` } }
  let requestForm = {}
    
  const onSubmit = (data) => {

    newsletterForm.map((item, i) => {
      if(data[item.name] !== '' ) {
        requestForm[item.id] = data[item.name]
      }
    })
    requestForm.form_id = 9 //form id
    requestForm[13] = key.current.value //alpha numeric key
    axios
    .post('https://stagingdev-kap.com/gravityform.php', {"form_data": requestForm}, config)
    .then(response => {
      if(response.data) {
        console.log('re -' + response.data )
        //router.push('/fast-application-thank-you')
        //document.getElementById("entry_id").value = response.data
        document.getElementById("news-letter").innerHTML = 'Thank you for submitting Signup news letter'
      }
    });
  }
  
  const handleBlur = (event) => {
    trigger(event.target.name)
  }

  return (
    <form name="gform" id="news-letter" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <p className="mt-3 relative text-kapitus z-0 w-full grid place-items-center">Signup For Our Newsletter</p>
      <div className="grid grid-cols-1 gap-6 mt-4">
        <div className="grid-cols-1 relative">
          <input type="text" placeholder="Email*" className="block w-full h-14 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 placeholder-kapitus text-xl font-semibold" {...register("email_address", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} onBlur={event => handleBlur(event)} />
            {errors.email_address?.type === 'required' && (<span className="text-errorred m-2">Email is Required</span>)}
            {errors.email_address?.type === 'pattern' && (<span className="text-errorred">Email is Invalid</span>)}
        </div>
        <div className="grid-cols-1 sm:grid-cols-1">
          <input type="hidden" ref={key} value={random} />
          <motion.input whileTap={{ scale: 0.9 }} className="h-12 w-full text-white rounded bg-kapitus hover:bg-green-700 transition duration-900 ease-in-out" type="submit" />
        </div>
      </div>
    </form>
  )
}
export default Newsletter;