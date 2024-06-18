import React, { useState } from 'react';
import './Contact.css';
function Contact()
{
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name"  required /><br></br>
        
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required /><br></br>
        
        <label htmlFor="subject">Subject</label>
        <input type="text" id="subject" name="subject" required /><br></br>
        
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5"  required></textarea><br></br>
        
        <button type="submit" >
         Submit
        </button>
      </form>
     
    </div>
  );

}
export default Contact;
