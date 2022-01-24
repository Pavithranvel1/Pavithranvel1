import React, { useState, useEffect, useRef } from 'react'
import { equipIndustries, lists, creditScores, aboutUs, months, days, years, states, contact, shortForm } from '../variables/data'
import Image from 'next/image'
import { useRouter } from "next/router";
import axios from 'axios'
import Phoneformat from '../formatter/phonenumber'
import Currencyformat from "../formatter/currencyformat"
import { useForm } from "react-hook-form"
import { Base64 } from 'js-base64'
var date1 = 'yyyy-mm-dd'
const Commonshortform = ( { refill, credentials } ) => {

  const router = useRouter()
  const [sales, setSales] = useState('complete the full application')
  const [entryid, setEntryId] = useState(0)
  const [fund, setFund] = useState("")
  const [phone, setPhone] = useState("")
  const [revenue, setRevenue] = useState("")
  const key = useRef()
  const [random, setRandom] = useState(Math.random().toString(36).substr(2, 6))

  let preloadedValues = { business_name: refill?.business_name, use_fund: refill?.use_fund, first_name: refill?.first_name, last_name: refill?.last_name, email_address: refill?.email_address, industry: refill?.industry, month: refill?.month, day: refill?.day, year: refill?.year, states: refill?.states, sales: refill?.sales}

  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm({
    defaultValues: preloadedValues,
    reValidateMode: 'onChange',
  });
  const auth = Base64.btoa(`${credentials.user}:${credentials.password}`);
  let config = { headers: { 'authorization': `${auth}` } }
  let requestForm = {}

  useEffect(() => {
    setEntryId(router.query?.gf_token || '')
    setPhone(refill?.phone_number || '')
    setFund(refill?.fund || '')
    setRevenue(refill?.annual_revenue || '')
  }, [router.query?.gf_token, refill?.phone_number, refill?.fund, refill?.annual_revenue])

  const onSubmit = (data) => {

    data.fund = fund.replace(`$`,``)
    data.phone_number = phone
    data.annual_revenue = revenue.replace(`$`,``)

    shortForm.map((item, i) => {
      if(typeof item.name == 'object'){
        let date = ''
        item.name.map((item1, i) => {
          if(data[item1] !== ''){
            date += data[item1]+'/'
          }
        })
        if(date !== ''){
          requestForm[item.id] = date.slice(0, -1); 
        }
      }
      else if(data[item.name] !== '' ) {
        requestForm[item.id] = data[item.name]
      }
    })
    requestForm.form_id = 47 //form id
    requestForm[31] = key.current.value //alpha numeric key
    requestForm.entry_id = entryid //entry id
    axios
      .post('https://kap-staging.us/next-js/gravityform.php', {"form_data": requestForm}, config)
      .then(response => {
        if(response.data) {
          console.log('first -' + response.data)
          if(data.sales == 'complete the full application'){
            let res = ''
            shortForm.map((item) => {
              if(typeof item.name == 'object'){
                item.name.map((item1) => {
                  if(item1){
                    res += item1 + '=' + data[item1] + '&'
                  }
                })
              }
              else {
                res += item.name + '=' + data[item.name] + '&'
              }
            })
            console.log(res)
            router.push(`http://localhost:3000/applynow?${res}`)
          }
          else {
            //router.push('http://localhost:3000/fast-application-thank-you') 
            const message = document.querySelector('.react-modal-sheet-container');
            //You can do many this with is
            message.textContent = 'Thanks for contacting us! We will get in touch with you shortly.'
          }
        }
        else {
          console.log(response.data)
        }
      });
  }

  const handleChange = (e) => {
    if(e.target.name == 'sales'){
      setSales(e.target.value)
    }    
    else if(e.target.name == 'phone_number'){
      // this is where we'll call the Phoneformat function
      const formattedPhoneNumber = Phoneformat(e.target.value);
      // we'll set the input value using our setPhone
      setPhone(formattedPhoneNumber)
    }
    else if(e.target.name == 'fund'){
      // this is where we'll call the Currencyformat function
      const formattedFund = Currencyformat(e.target.value);
      // we'll set the input value using our setFund
      setFund(formattedFund)
    }
    else if(e.target.name == 'annual_revenue'){
      // this is where we'll call the Currencyformat function
      const formattedFund = Currencyformat(e.target.value);
      // we'll set the input value using our setRevenue
      setRevenue(formattedFund)
    }
  }

  const handleBlur = (event) => {
    let formData = {}
    if(event.target.value) {
      shortForm.map((item, i) => {
        if(item.name == event.target.name) {
          formData[item.id] = event.target.value
        }
        else if(typeof item.name == 'object'){
          item.name.map((item1, i) => {
            if('year' == event.target.name){
              date1 = date1.replace(date1.substring(0, 4), event.target.value)
            }
            else if('month' == event.target.name){
              date1 = date1.replace(date1.substring(5, 7), event.target.value)
            }
            else if('day' == event.target.name) {
              date1 = date1.replace(date1.substring(8, 10), event.target.value)
            }
          })
          formData[6] = date1
        }
      })
      formData.form_id = 47 //form id
      if(entryid)
        formData.entry_id = entryid //entry id
      axios
      .post('https://kap-staging.us/next-js/gravityform.php', {"form_data": formData}, config)
      .then(response => {
        if(response.data !== '' && !isNaN(response.data)) {
          console.log('first -' + response.data)
          setEntryId(response.data)
        }
        else {
          console.log(response.data)
        }
      });
    }
    trigger(event.target.name);
  }

  return (
      <section className="w-full max-w-4xl mt-2 px-8 m-auto">
      <div className="w-full h-30">
        <div className="w-full py-2 bottom-0 inset-x-0 text-2xl font-lg text-center text-kapitusLiteGreen">Get A Free Quote Today</div>
      </div>
      <form name="shortform" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 relative">
          <input type="tel" placeholder="How Much Do You Need?" className="w-full p-2 mt-2 text-lg font-semibold font-semiboldbg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("fund", { required: fund ? false : true  })} onBlur={event => handleBlur(event)} value={fund} onChange={event => handleChange(event)} />
          {errors.fund?.type === 'required' && (<span className="text-errorred m-2">Fund Needed is Required<span className="error" /></span>)}
          {fund && <span className="success"></span>}
        </div>
        <div className="col-span-2 relative">
          <input type="text" placeholder="DBA (Business Name)" className="w-full p-2 mt-2 text-lg font-semibold font-semiboldbg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" autoComplete="off" {...register("business_name", { required: true })} onBlur={event => handleBlur(event)} />
          {errors.business_name?.type === 'required' && (<span className="text-errorred m-2">Business Name is Required<span className="error" /></span>)}
          {watch("business_name") && typeof errors.business_name?.type == 'undefined' && <span className="success"></span>}
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
          <select className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue" {...register("industry", { required: true })} onBlur={event => handleBlur(event)}>
          <option value="">Industry</option>
          {equipIndustries.map((industry, i) =>
          <option value={industry} key={i}>{industry}</option>)}
          </select>
          {errors.industry?.type === 'required' && (<span className="text-errorred m-2">Industry is Required<span className="error" /></span>)}
          {watch("industry") && typeof errors.industry?.type == 'undefined' && <span className="success"></span>}
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
          <select className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue" {...register("use_fund", { required: true })} onBlur={event => handleBlur(event)}>
          <option value="">Use of Fund</option>
          {lists.map((item, i) =>
          <option value={item} key={i}>{item}</option>)}
          </select>
          {errors.use_fund?.type === 'required' && (<span className="text-errorred m-2">Use of Fund is Required<span className="error" /></span>)}
          {watch("use_fund") && typeof errors.use_fund?.type == 'undefined' && <span className="success"></span>}
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
          <input type="text" placeholder="First Name" className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("first_name", { required: true })} onBlur={event => handleBlur(event)} />
          {errors.first_name?.type === 'required' && (<span className="text-errorred m-2">First Name is Required<span className="error" /></span>)}
          {watch("first_name") && typeof errors.first_name?.type == 'undefined' && <span className="success"></span>}
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
          <input type="text" placeholder="Last Name" className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("last_name", { required: true })} onBlur={event => handleBlur(event)} />
          {errors.last_name?.type === 'required' && (<span className="text-errorred m-2">Last Name is Required<span className="error" /></span>)}
          {watch("last_name") && typeof errors.last_name?.type == 'undefined' && <span className="success"></span>}
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
          <input type="email" placeholder="Email Address" className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("email_address", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} onBlur={event => handleBlur(event)} />
          {errors.email_address?.type === 'required' && (<span className="text-errorred m-2">Email is Required <span className="error" /></span>)}
          {errors.email_address?.type === 'pattern' && (<span className="text-errorred">Email is Invalid.<span className="error" /></span>)}
          {watch("email_address") && typeof errors.email_address?.type == 'undefined' && <span className="success"></span>}
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
          <input type="tel" placeholder="Phone Number" className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("phone_number", { required: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(phone) ? false : true })} onBlur={event => handleBlur(event)} maxLength="14" onChange={event => handleChange(event)} value={phone} />
          {errors.phone_number?.type === 'required' && (<span className="text-errorred m-2">{phone == `` ? `Phone Number is Required`: `Phone format: (###) ###-####`}<span className="error" /></span>)}
          {/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(phone) && <span className="success" />}
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
          <select className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue" {...register("credit_score", { required: true })} onBlur={event => handleBlur(event)}>
          <option value="">Credit Score</option>
          {creditScores.map((item, i) =>
          <option value={item.value} key={i}>{item.text}</option>)}
          </select>
            {errors.credit_score?.type === 'required' && (<span className="text-errorred m-2">Credit Score is Required<span className="error" /></span>)}
            {watch("credit_score") && typeof errors.credit_score?.type == 'undefined' && <span className="success"></span>}
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
          <input type="text" placeholder="Annual Revenue (Estimate) $" className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("annual_revenue", { required: revenue ? false : true })} value={revenue} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} />
          {errors.annual_revenue?.type == 'required' && (<span className="text-errorred m-2">Annual Revenue is Required<span className="error" /></span>)}
          {revenue && <span className="success" />}
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
          <select className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue" {...register("about_us", { required: true })} onBlur={event => handleBlur(event)}>
          <option value="">How did you hear about us?</option>
          {aboutUs.map((about_us, i) =>
          <option value={about_us} key={i}>{about_us}</option>)}
          </select>
          {errors.about_us?.type === 'required' && (<span className="text-errorred m-2">About Us is Required<span className="error" /></span>)}
          {watch("about_us") && typeof errors.about_us?.type == 'undefined' && <span className="success"></span>}
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-1 py-2 text-lg font-semibold text-liteblue w-full gap-1 relative">
          <div className="flex">
          <select className="border border-gray-200 p-2 rounded w-1/3" {...register("month", { required: true })} id="6.1" onBlur={event => handleBlur(event)}>
            <option value="">Month</option>
            {months.map((option, i) =>
            <option value={option} key={`${i}month`}>{option}</option>
            )}
          </select>
          <select className="border border-gray-200 p-2 rounded w-1/3" {...register("day", { required: true })} id="6.2" onBlur={event => handleBlur(event)}>
          <option value="">Day</option>
          {days.map((option, i) =>
          <option value={option} key={`${i}day`}>{option}</option>
          )}
          </select> 
          <select className="border border-gray-200 p-2 rounded w-1/3" {...register("year", { required: true })} id="6.3" onBlur={event => handleBlur(event)}>
            <option value="">Year</option>
            {years.map((option, i) =>
            <option value={option} key={`${i}year`}>{option}</option>
            )}
          </select>
          </div>
          <div className="text-base pt-3">When Did You Start Your Business?</div>
          {(errors.month?.type === 'required' || errors.day?.type === 'required' || errors.year?.type === 'required') && (<span className="text-errorred m-2">Date is Required<span className="error" /></span>)}
          {(watch("month") && watch("day") && watch("year") && typeof errors.month?.type == 'undefined' && typeof errors.day?.type == 'undefined' && typeof errors.year?.type == 'undefined') && <span className="success" />}
        </div>

        <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
          <select className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue" {...register("states", { required: true })} onBlur={event => handleBlur(event)}>
          <option value="">What state is Your Business In?</option>
          {states.map((state, i) =>
          <option value={state} key={i}>{state}</option>)}
          </select>
          {errors.states?.type === 'required' && (<span className="text-errorred m-2">State is Required<span className="error" /></span>)}
          {watch("states") && typeof errors.states?.type == 'undefined' && <span className="success"></span>}
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
        </div>

        <div className="col-span-2 relative">
          <span className="flex"><Image alt="right-arrow" width="35" height="30" src="/images/right-arrow-green.svg" className="bg-center bg-contain inline-block mr-6 h-10 w-10 bg-no-repeat" /><label className="font-bold text-kapitus text-lg ml-5">I would like to</label></span>
            <select className="w-full px-4 py-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue relative" defaultValue={sales} onChange={event => handleChange(event)} {...register("sales", { required: true })} onBlur={event => handleBlur(event)}>
              {contact.map((item, i) =>
              <option value={item} key={i}>{item}</option>)}
            </select>
            {errors.sales?.type === 'required' && (<span className="text-errorred m-2">This Field is Required<span className="error" /></span>)}
            {(watch("sales") && typeof errors.sales?.type == 'undefined') && <span className="success" />}
        </div>
      <div className="col-span-2 text-liteblue text-lg">
        Fees may apply. Kapitus needs the contact information you provide to us to contact you about our products and services. You may unsubscribe from these communications at any time. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, please review our 
      </div>
      <div className="col-span-2 text-left mb-4">
        <input type="hidden" ref={key} value={random} />
        <input className="py-3 px-6 bg-kapitusLiteGreen text-white font-bold w-full sm:w-36" type="submit" />
      </div>
        </div>
      </form>
      </section>
    )
}
export default Commonshortform;