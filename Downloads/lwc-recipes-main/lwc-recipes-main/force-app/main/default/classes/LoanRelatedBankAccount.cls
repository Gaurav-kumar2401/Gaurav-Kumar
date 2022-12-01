/*
 * Author :Gaurav Kumar
 * Description : 
 * Test Class : LoanRelatedBankAccountTest
 * Date : 09/11/2022
*/
public with sharing class LoanRelatedBankAccount {
   
        @auraEnabled(cacheable = true)
        public static List<Bank_Account__c> fetchBankAccount()
        {
            List<Bank_Account__c> bankAccountList = [SELECT Id,Name,Branch__c FROM Bank_Account__c WHERE Branch__c != null  LIMIT 100];
            return bankAccountList;
        }

        @auraEnabled(cacheable = true)
        public static List<Loan__c> fetchLoan(String loanId)
        {
            List<Loan__c> loanList = [SELECT Id,Name,Loan_Amount__c,Bank_Account__c,Loan_Type__c,Paid_Amount__c,Pending_Amount__c FROM Loan__c WHERE Bank_Account__c = : loanId];
            return loanList;
        }
}
