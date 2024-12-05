import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Add this import
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Update this import
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  standalone: true, // Add this if using standalone component
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule] // Add these imports
})
export class HomeComponent {
  title = 'alonzo-portfolio';
  contactForm: FormGroup;

  private cvFilePath = 'assets/cv/JUNDREL_CV.pdf';

  // download CV
  downloadCV() {
    const link = document.createElement('a');
    link.href = this.cvFilePath;
    link.download = 'My_CV.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  constructor(private fb: FormBuilder) {
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
        'service_nabgl9o',
        'template_j7g0auk',
        {
          name: formValues.name,
          email: formValues.email,
          subject: formValues.subject,
          message: formValues.message,
        },
        'SY0n4G6RbI75zqRqf'
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