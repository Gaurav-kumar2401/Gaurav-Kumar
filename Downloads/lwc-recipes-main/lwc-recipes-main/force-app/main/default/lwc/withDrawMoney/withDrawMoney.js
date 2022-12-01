import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import withdrawMoneyToAccount from '@salesforce/apex/BankAccountRelatedBranch.withdrawMoneyToAccount';

const actions = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' }    
 ];
export default class WithDrawMoney extends NavigationMixin(LightningElement) {
    @track data;
    @track error;
    @track visible =false;
    @track checkError =false;
    accountNumber;
    Amount;
    
    
    @track columns = [{
        label: "Account Number",
        fieldName: "Name"
    },
    {
        label: "Total Amount",
        fieldName: "Total_Amount__c"
    }
    ,
    {
        type: 'action',
        typeAttributes: {
            rowActions: actions,
            menuAlignment: 'right'
        }
    }
     
];
    firstInput(Event){
        this.accountNumber=Event.target.value;
    }
    secondInput(Event){
        this.Amount=parseInt(Event.target.value);
    }
    withdrawMoney() {
        // this.visible=true;
        withdrawMoneyToAccount({accountNumber :this.accountNumber ,Amount :this.Amount})
            .then(result => {
                
                console.log("Result :"+result);
                if(result ==null){
                    
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
                }
            })
            .catch(error=>{
                this.checkError=true;
                this.error=error;
                console.log("Error :"+error);
            })
    }

    handleRowActions(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.recordId = row.Id;
        switch (actionName) {
            case 'view':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        actionName: 'view'
                    }
                });
                break;
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: 'Bank_Account__c',
                        actionName: 'edit'
                    }
                });
                break;
            
        }
    }
}