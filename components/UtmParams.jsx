/* eslint-disable @next/next/no-img-element */
 const UtmParams = url => url &&  url.includes(`?`) ? `?`+ url.split(`?`)[1] : ``

export default UtmParams;