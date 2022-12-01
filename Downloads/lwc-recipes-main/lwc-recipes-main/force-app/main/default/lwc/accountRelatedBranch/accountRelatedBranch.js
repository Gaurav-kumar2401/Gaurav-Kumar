import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import fetchBranch from '@salesforce/apex/BankAccountRelatedBranch.fetchBranch';
import fetchAccount from '@salesforce/apex/BankAccountRelatedBranch.fetchAccount';
import fetchAccountDetail from '@salesforce/apex/BankAccountRelatedBranch.fetchAccountDetail';


export default class Display_Accounts_And_Related extends NavigationMixin(LightningElement) {

    @track acc;
    @track con;
    @track columns = [{
        label: 'Account Number',
        fieldName: 'Name',
        type: 'text',
        sortable: true
    },
    {
        label: 'Type',
        fieldName: 'Account_Type__c',
        type: 'picklist',
        sortable: true
    },
    {
        label: 'Opening Amount',
        fieldName: 'Opening_Amount__c',
        type: 'picklist',
        sortable: true
    }]
    branchId;
    accId;
    getValue;
    msg;
    connectedCallback() {
        fetchBranch()
            .then(result => {
                this.acc = result;

                console.log('data', JSON.stringify(result));
                console.log("result : ", this.acc);
            })

    }

    allAccountFetch(event) {
        this.branchId = event.target.value;
        console.log('Branch Id-->' + this.branchId);
        fetchAccount({ branchId: this.branchId })

            .then(result => {
                this.con = result;

                console.log(JSON.stringify(result));
                console.log("result1", this.con);
            })
            .catch(error => {
                this.error = error;

            })
            .catch(error => {
                this.error = error;
            })
    }

    /* navigateToRecordViewPage() {
         // View a custom object record.
         this[NavigationMixin.Navigate]({
             type: 'standard__recordPage',
             attributes: {
                 recordId: 'a025g00000C6e06AAB',
                 objectApiName: 'Bank_Account__c', // objectApiName is optional
                 actionName: 'view'
             }
         });
     }*/


    handleRowSelected(event) {
        
        var recordId = event.detail.selectedRows[0];
        // window.alert(JSON.stringify(recordId));
        console.log(JSON.stringify(recordId));
        console.log('recId : ', recordId.Id);
        // recordId.forEach(element => {

        //     console.log('recId : ' , element.Id);
        // });
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: 'a025g00000C6e06AAB',
                objectApiName: 'Bank_Account__c', // objectApiName is optional
                actionName: 'view'
            }
        });
        
          
    }
}