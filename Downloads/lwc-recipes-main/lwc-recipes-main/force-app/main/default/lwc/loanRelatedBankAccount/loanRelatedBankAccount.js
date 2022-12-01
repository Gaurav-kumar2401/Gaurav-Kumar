import { LightningElement, track } from 'lwc';
import fetchBankAccount from '@salesforce/apex/LoanRelatedBankAccount.fetchBankAccount';
import fetchLoan from '@salesforce/apex/LoanRelatedBankAccount.fetchLoan';


export default class LoanRelatedBankAccount extends LightningElement {
    @track acc;
    @track loan;
    loanId;
    @track columns = [{
        label: 'Loan Number',
        fieldName: 'Name',
        type: 'text',
        sortable: true
    },
    {
        label: 'Type',
        fieldName: 'Loan_Type__c',
        type: 'picklist',
        sortable: true
    },
    {
        label: 'Loan Amount',
        fieldName: 'Loan_Amount__c',

    },
    {
        label: 'Paid Amount',
        fieldName: 'Paid_Amount__c',

    },
    {
        label: 'Pending Amount',
        fieldName: 'Pending_Amount__c',

    }
    ]
    connectedCallback() {
        fetchBankAccount()
            .then(result => {
                this.acc = result;

                console.log('data', JSON.stringify(result));
                console.log("result : ", this.acc);
            })

    }

    allLoanFetch(event) {
        this.loanId = event.target.value;
        console.log('Loan Id-->' + this.loanId);
        fetchLoan({ loanId: this.loanId })

            .then(result => {
                this.loan = result;

                console.log('Result :' + JSON.stringify(result));
                console.log("result1", this.loan);
            })
            .catch(error => {
                this.error = error;

            })
    }
}