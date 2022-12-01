import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import moneyTransfer from '@salesforce/apex/BankAccountRelatedBranch.moneyTransfer';

export default class MoneyTransfer extends LightningElement {
    @track data;
    @track visible =false;
    accountNumberFrom;
    amount;
    accountNumberTo;

    @track columns = [{
        label: "Account Number",
        fieldName: "Name"
    },
    {
        label: "Total Amount",
        fieldName: "Total_Amount__c"
    }]

    firstInput(event) {
        this.accountNumberFrom = event.target.value;
    }
    secondInput(event) {
        this.accountNumberTo = event.target.value;
    }
    thirdInput(event) {
        this.amount = parseInt(event.target.value);
    }
    transferMoney() {
        
        moneyTransfer({accountNumberFrom :this.accountNumberFrom,accountNumberTo:this.accountNumberTo ,amount :this.amount})
            .then(result => {
                // this.visible=true;
                console.log("Result Data:"+result);
                
                if(result == null || result == ''){
                   const event = new ShowToastEvent({
                        title: 'Correct Amount',
                        message: 'Your Amount Is Greater then Available Balance',
                        variant: 'error',
                        //mode: 'dismissable'
                        
                    });
                    this.dispatchEvent(event); 
                }
                else{
                    this.visible=true;
                    this.data = result;
                    const event = new ShowToastEvent({
                        title: 'SUCCESS',
                        message: 'Payment Successfull',
                        variant: 'SUCCESS',
                        //mode: 'dismissable'
                        
                    });
                    this.dispatchEvent(event);
                    
                }
                
            })
            .catch(error=>{
                console.log("Error :"+error);
            })
    }
}