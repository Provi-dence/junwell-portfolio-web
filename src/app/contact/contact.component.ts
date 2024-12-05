import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
    selector: 'contact',
    templateUrl: './home.component.html'
})

export class ContactComponent {
    title = 'contact-junwell'


    contactForm: FormGroup;


    constructor(private fb: FormBuilder) {
    // Initialize the form
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  sendEmail() {
    if (this.contactForm.valid) {
      const formValues = this.contactForm.value;
      
      emailjs.send(
        'service_nabgl9o',    // Replace with your EmailJS service ID
        'template_j7g0auk',   // Replace with your EmailJS template ID
        {
          name: formValues.name,
          email: formValues.email,
          subject: formValues.subject,
          message: formValues.message,
        },
        'SY0n4G6RbI75zqRqf'         // Replace with your EmailJS user ID (found in EmailJS dashboard)
      ).then((response: EmailJSResponseStatus) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message sent successfully!');
        this.contactForm.reset();
      }).catch((err) => {
        console.error('FAILED...', err);
        alert('Message failed to send. Please try again later.');
      });
    }
  }
}