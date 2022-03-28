import React, { useState, useEffect } from 'react';
import styles from '../styles/Hero.module.scss';

function Hero({
  indexTitle,
  title,
  subtitle,
  advtitle,
// phone,
  id,
  bgImage,
  buttonText,
  buttonURL,
  button2Text,
  button2URL,
  children,
  slug,

}){

  const [popup, setPopUp] = useState(false)
  const [popuppartner, setPopUpPartner] = useState(false)

  const togglePop = (e) => {
    e.preventDefault();
    setPopUp((prevState) => !prevState)
  }

  useEffect(() => {
      let partner = document.getElementsByClassName("partners")
      if(Object.keys(partner).length > 0)
       partner[0].addEventListener('click', function(e) {
        e.preventDefault();
        var class1 = this.getAttribute("class");
        if(class1.includes('partners')){
          setPopUpPartner((prevState) => !prevState)
        }
      });
  })

  return (
    <section
      {...(id && { id })}
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none' }}
      className={styles.hero}>

       <div className={styles.wrap}>
        <div className="" 
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: title ?? '' }}
          />
          <h1>{indexTitle}</h1>
        <div className={styles.intro}>
          <div className={styles.children}>{children}</div>
          {buttonText && buttonURL && (
            <p>
              <a href={buttonURL} onClick={togglePop} className="button">
                {buttonText}
              </a>
            </p>
          )}
          {button2Text && button2URL && (
            <p>
              <a href={button2URL} className="button button-secondary">
                {button2Text}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
    
  );
}

export default Hero;
