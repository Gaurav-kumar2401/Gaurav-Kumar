import { api,LightningElement, track } from 'lwc';
import Object_Field from '@salesforce/schema/Branch__c';
import Name_Field from '@salesforce/schema/Branch__c.Name';
import branch_Code from '@salesforce/schema/Branch__c.Branch_Code__c';
import ISFC_Code from '@salesforce/schema/Branch__c.ISFC_Code__c';


export default class RecordForm extends LightningElement {
    @track fields =[Name_Field ,branch_Code,ISFC_Code];
    @api recordId;
    @api objectApiName;
}