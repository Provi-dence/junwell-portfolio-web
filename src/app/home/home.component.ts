import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Add this import
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Update this import
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { EmailService } from '../_service';
import Swal from 'sweetalert2';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  standalone: true, // Add this if using standalone component
  imports: [CommonModule, ReactiveFormsModule],
  providers: [EmailService]
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

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }


  public sendEmail(name: string, email: string, subject: string, message: string) {

    const emailParams = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    }

    emailjs
    .send('service_1rvfcma', 'template_bdg0s7t', emailParams, 'SY0n4G6RbI75zqRqf')
    .then(
      () => {
        console.log('SUCCESS!');
        Swal.fire({
          icon: 'success',
          title: 'Sending your email...',
        }).then(() => window.location.reload());
      },
      (error: EmailJSResponseStatus) => {
        console.log('FAILED...', error.text);
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong!',
          text: 'Please try again later.',
        });
      }
    );
  }

  onSubmit() {
    if(this.contactForm.valid){
      const {name, email, subject, message } = this.contactForm.value;


      this.sendEmail(name, email, subject, message )

      this.emailService.sendEmail(name, email, subject, message).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Thank you! Stay tuned for the updates!'
          }).then(() => window.location.reload());
        },
        error: (err) => {
          console.error('Error!', err);
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Please try again later.'
          });
        }
      })
    }
  }


}
