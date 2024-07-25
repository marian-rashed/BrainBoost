import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root',
})
export class ContactServiceService {
  private serviceID = 'YOUR_SERVICE_ID';
  private templateID = 'YOUR_TEMPLATE_ID';
  private userID = 'YOUR_USER_ID';

  constructor() {}

  sendEmail(form: {
    name: string;
    email: string;
    message: string;
  }): Promise<EmailJSResponseStatus> {
    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
    };

    return emailjs.send(
      this.serviceID,
      this.templateID,
      templateParams,
      this.userID
    );
  }
}
