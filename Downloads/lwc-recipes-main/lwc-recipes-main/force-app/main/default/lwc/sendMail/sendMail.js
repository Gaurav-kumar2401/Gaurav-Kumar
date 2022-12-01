import { LightningElement } from 'lwc';
import sendMail from '@salesforce/apex/SendEmailApiCallout.sendMail';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SendEmail extends LightningElement {

      getData = {
            email: '',
            subject: '',
            body: ''
      }
      handleEmailChange(event) {
            this.email = event.target.value;
      }
	  handleSubjectChange(event) {
            this.subject = event.target.value;
      }
	  handleBodyChange(event) {
            this.body = event.target.value;
      }

      handleClick() {
            sendMail({ email: this.getData.email, subject: this.getData.subject, body: this.getData.body })
                  .then(result => {
                        console.log('Success', result);
                        

                  }).catch(error => {
                        console.log('error', error);
                        
                  })
      }
}