import { LightningElement ,track ,wire } from 'lwc';
import fetchBranch from '@salesforce/apex/BankAccountRelatedBranch.fetchBranch';

export default class ImperativeComponent extends LightningElement {


    @track data;
    @track columns = [{
        label: "Name",
        fieldName: "Name"
    },
    {
        label: "Branch Code",
        fieldName: "Branch_Code__c"
    }]

    handleClick(){
        fetchBranch()
        .then(result =>{
            this.data = result;
        })
        .catch(error=>{
            console.log("Error :"+error);
        })
    }
    
}