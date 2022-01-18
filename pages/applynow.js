import React, { useEffect, useState } from "react";
import Image from 'next/image'
import Fastapp from "../components/forms/fast-app"
import { useRouter } from "next/router";
import Popup from "../components/popup";

export default function Applynow(props) {
  const router = useRouter();
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setTrigger(true)
      document.body.style.overflowY='hidden'
    }, 5000)
  }, [trigger])

  return (
    <>
    <div className="bg-kapitus py-10 px-10 m-auto w-full">
      <div className="col-span-2 mb-2 text-center text-kapitusblue text-xs font-bold">
        <Image src="/images/kapitus_logo_white.jpg" alt="logo" width={300} height={120} />
      </div>

      <div className={`max-w-4xl m-auto text-center ${trigger ? `opacity-50`:``}`}>
        <div className="mt-10 px-8 py-20" style={{background:"url(/images/form-banner.jpg) center center"}}>
        <section>
        <div>
        <h1 className="text-left"><span className="text-white text-xl font-bold">BUSINESS LOANS GET APPROVED FAST</span></h1>
        <h2 className="text-left"><span className="text-white text-xl font-bold">GET APPROVED FAST</span></h2>
        </div>
        </section>
        <section>
        <div className="pl-4 mt-4">
        <div className="text-left"><span className="text-white">• 250K in Average Annual Revenue Required</span></div>
        <div className="text-left"><span className="text-white">• 2+ Years in Business Required</span></div>
        <div className="text-left"><span className="text-white">• 625 Credit Score</span></div>
        </div>
        </section>
        </div>
        <Fastapp credentials={props.credentials} fieldData={router.query} />
      </div>
    </div>
      <Popup trigger={trigger} setTrigger={setTrigger}>
      </Popup>
    </>
  );
}

export async function getServerSideProps(context) {

  const entryId = context.query.gf_token || ''
  let gfdata = []
  if(entryId !== '') {
    //const res  = await axios.post(`https://stagingdev-kap.com/gravityform_fetch.php?entry_id=${entryId}`)
    //gfdata = await res.data;
  }
  return {
    props:{
      gfentrydata : gfdata, entry_id: entryId, credentials: {user: process.env.PRIVATE_USER, password: process.env.PASSWORD }
    }
  }
}