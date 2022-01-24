import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from 'framer-motion'
import FormCard from "../../components/forms/partners/FormCard";
import {
  You,
  Company,
  Program,
  Reach
} from "../../components/forms/partners";
import FormCompleted from "../../components/forms/partners/FormCompleted";

let localdata = ['gfproduct', 'gffund', 'gfindustry', 'gfmonth', 'gfyear', 'gfcheckbox', 'gfrevenue', 'gfrepayment', 'gfbusiness', 'gfloan', 'gflender', 'gfcreditscore']

const Partners = () => {
  const router = useRouter();
  //const [formStep, setFormStep] = useState(0);
  const formStep = router.query.form
  const [data, setData] = useState({});

  useEffect(() => {
    let data1 = {}
    //get items from local storage and store to variable data
    localdata.map((item, i) => {
      if(localStorage.getItem(item)){
        let item1 = item.replace('gf','')
        data1[item1] = localStorage.getItem(item)
      }
    })
    let personalinfo = JSON.parse(localStorage.getItem('gfpersonalinfo'))
    if(personalinfo){
      for(var k in personalinfo) {
        data1[k] = personalinfo[k]
      }
    }
    setData(data1);
    //router.push('/')
  }, []);

  const onDrag = (event, info) => {

    if (info.offset.y > 500) {
      setTimeout(function(){
        router.push("/")
      }, 1000)
    }
  }

  /*const nextFormStep = () => setFormStep((currentStep) => {
    localStorage.setItem('formstep', (currentStep + 1))
    return currentStep + 1
  });

  const prevFormStep = () => setFormStep((currentStep) => {
    localStorage.setItem('formstep', (currentStep - 1))
    return currentStep - 1
  });*/

  //setStep(formStep)
  return (
    <motion.div className="p-4 px-10 pb-8 bg-kapitus relative min-h-full overflow-auto" drag="y" dragConstraints={{ top: 0, bottom:0 }} onDrag={onDrag} style={{height: '450px'}}>
      <Head>
        <title>Partner Form</title>
      </Head>
      <FormCard currentStep={formStep}>
        {formStep == 1 && (
          <You formStep={formStep} setData={setData} data={data} />
        )}
        {formStep == 2 && (
          <Company formStep={formStep} setData={setData} data={data} />
        )}
        {formStep == 3 && (
          <Program formStep={formStep} setData={setData} data={data} />
        )}
        {formStep == 4 && (
          <Reach formStep={formStep} setData={setData} data={data} />
        )}
        {formStep > 4 && <FormCompleted />}
      </FormCard>
	</motion.div>
  );
};

export default Partners;