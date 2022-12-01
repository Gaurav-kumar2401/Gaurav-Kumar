import { LightningElement, track } from 'lwc';
import fetchAccountDetail from '@salesforce/apex/BankAccountRelatedBranch.fetchAccountDetail';

export default class SearchAccount extends LightningElement {
    @track bankAccountList;
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
        label: 'Total Amount',
        fieldName: 'Total_Amount__c',
        sortable: true
    }]

    getValue;
    // input;

       handleSearch(event) {
        console.log('Data Type-->' + event.target);
        this.getValue = event.target.value;
        console.log('value : ', this.getValue);

        fetchAccountDetail({ getValue: this.getValue })

            .then(result => {
                console.log('res : ', result);
                this.bankAccountList = result;

            })
            .catch(error => {
                this.error = error;
                console.log('Error : ', error);

            });

    }
}