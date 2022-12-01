import { LightningElement, track } from 'lwc';
import depositMoneyToAccount from '@salesforce/apex/BankAccountRelatedBranch.depositMoneyToAccount';

export default class DepositMoney extends LightningElement {
    @track data;
    @track visible =false;
    accountNumber;
    Amount;
    
    @track columns = [{
        label: "Account Number",
        fieldName: "Name"
    },
    {
        label: "Total Amount",
        fieldName: "Total_Amount__c"
    }]
    firstInput(Event){
        this.accountNumber=Event.target.value;
    }
    secondInput(Event){
        this.Amount=parseInt(Event.target.value);
    }

    depositMoney() {
        this.visible=true;
        depositMoneyToAccount({accountNumber :this.accountNumber ,Amount :this.Amount})
            .then(result => {
                this.data = result;
            })
            .catch(error=>{
                console.log("Error :"+error);
            })
    }
    error;
    stack;

    errorCallback(error, stack) {
        this.error = error;
    }
}