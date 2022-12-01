import { api,track, LightningElement } from 'lwc';
import getOpportunityContact from '@salesforce/apex/GetOpportunityContactRelatedAccount.getOpportunityContact';


export default class GetChildRecord extends LightningElement {
    @api showData="Show";
    @api recordId;
    oppData;
    conData;
    @api showDataTable =false;
    @track columns = [{
        label: "Opportunity Name",
        fieldName: "Name"
    },
    {
        label: "Amount",
        fieldName: "Amount"
    }]

    @track columns1 = [{
        label: "Contact Name",
        fieldName: "Name"
    },
    {
        label: "Title",
        fieldName: "Title"
    }]

    handleEvent(event){
        if(event.target.label=="Show"){
            this.showData="Hide";
            this.showDataTable=true;
        }
        else if(event.target.label=="Hide"){
            this.showData="Show";
            this.showDataTable=false;
        }
    }

    connectedCallback(){
        getOpportunityContact({recId : this.recordId})
        .then(result=>{
            let tempRecord=result;
            //console.log('Data :'+JSON.stringify(tempRecord));
            let temp = tempRecord.map(row=>{
                return Object.assign({oppName:row.Opportunities ,contactName:row.Contacts})
            }) 
            temp.forEach(element=>{
                this.oppData =element.oppName;
                this.conData=element.contactName;
            })
        })
        .catch(error=>{
            console.log('Error :'+error);
        })
    }
}