import { LightningElement, wire, api, track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import Dependent_Picklist from '@salesforce/schema/Dependent_Picklist__c';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Country_FIELD from '@salesforce/schema/Dependent_Picklist__c.Country__c';
import state_FIELD from '@salesforce/schema/Dependent_Picklist__c.State__c';

export default class Poc extends LightningElement {
    @wire(getObjectInfo, { objectApiName: Dependent_Picklist })
    picklistInfo;
    stateData;
    @track staOptions;
    @track controllingPicklist;
    countryVal;
    stateVal;
    error;

    
    @wire(getPicklistValues, { recordTypeId: '$picklistInfo.data.defaultRecordTypeId', fieldApiName: state_FIELD })
    stateFieldInfo({ data, error }) {
        if (data) this.stateData = data;
        else if (error) this.error = error;
    }

    @wire(getPicklistValues, { recordTypeId: '$picklistInfo.data.defaultRecordTypeId', fieldApiName: Country_FIELD })
    countryFieldInfo({ data, error }) {
        if (data) this.controllingPicklist = data.values;
        else if (error) this.error = error;
    }

    fetchDependentValue(event) {
        // console.log('Inside Value');
        // this.countryVal = event.target.value;
        // console.log('countryVal : ', this.countryVal);

        let key = this.stateData.controllerValues[event.target.value];
        console.log('key :'+key);
        this.staOptions = this.stateData.values.filter(opt => opt.validFor.includes(key));
    }
    handelState(event){
        this.stateVal = event.target.value;
        console.log('stateVal : ', this.stateVal);
    }
}