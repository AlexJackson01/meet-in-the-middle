import React, {useState, useRef} from 'react';
import LogoNav from './LogoNav';
import emailjs from '@emailjs/browser';
import{ init } from '@emailjs/browser';
init("user_HlsvJEpkUfjym2nM9POQf");


export default function Contact() {

    let [emailSent, setEmailSent] = useState("");

    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ijuczue', 'template_c10wep9', form.current, 'user_HlsvJEpkUfjym2nM9POQf')
        .then((result) => {
            setEmailSent("Message sent!")            
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }


    return (
        <div className="container">
            <LogoNav />            
            <form ref={form} className='input-form' onSubmit={sendEmail}>
        <div className="row">
      <div className="row col-lg-3 col-xs-3 col-sm-3">
        <div className="form-group">
      <label>Name</label>
        <input type="text" className="form-control input-group-lg header" name="user_name" />
                        </div></div>
    <div className="col-lg-3 col-xs-3 col-sm-3">
      <div className="form-group">
      <label>Email</label>
        <input type="email" className="form-control input-group-lg header" name="user_email" />
                    </div></div>
                </div>
    <div className="row">
      <div className="row col-lg-6 col-xs-6 col-sm-6">
        <div className="form-group">
      <label>Message</label>
                            <textarea name="message" className="form-control input-group-lg header" />
                        </div></div></div>
                
    <div className="search-btn">
            <button type="submit" id="search">Send</button>
            </div>
            </form>
            {emailSent}

            
        </div>
    )
}
