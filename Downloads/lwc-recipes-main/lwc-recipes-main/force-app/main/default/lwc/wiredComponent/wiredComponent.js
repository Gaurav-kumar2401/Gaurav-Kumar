import { LightningElement, track, wire } from 'lwc';
import fetchBranch from '@salesforce/apex/BankAccountRelatedBranch.fetchBranch';

export default class WiredComponent extends LightningElement {
    @track data;
    @track columns = [{
        label: "Name",
        fieldName: "Name"
    },
    {
        label: "Branch Code",
        fieldName: "Branch_Code__c"
    }]

    @wire(fetchBranch)
    wiredBranch({ data, error }) {
        if (data) {
            this.data = data;
        }
        else if(error) {
            console.log("Error :" + error);
        }
    }
}