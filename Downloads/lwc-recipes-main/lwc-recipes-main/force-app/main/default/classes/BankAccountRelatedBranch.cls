/*
* Author :Gaurav Kumar
* Description : 
* Test Class : BankAccountRelatedBranchTest
* Date : 07/11/2022
*/
public with sharing class BankAccountRelatedBranch {
    //private Map<String,String> bankAccNameToMap = new Map<String,String>();

    // Find All Branch List
    @auraEnabled(cacheable = true)
    public static List<Branch__c> fetchBranch()
    {
        List<Branch__c> branchList = [SELECT Id,Name ,Branch_Code__c FROM Branch__c LIMIT 100];
        return branchList;
    }
    //To find all account detail  for that particular Branch
    @auraEnabled(cacheable = true)
    public static List<Bank_Account__c> fetchAccount(String branchId)
    {
        List<Bank_Account__c> bankAccountList = [SELECT Id,Name,Account_Type__c ,Opening_Amount__c,Branch__c FROM Bank_Account__c WHERE Branch__c = : branchId LIMIT 100];
        return bankAccountList;
    }
    //Enable to Search for the details of the given account number
    //Displays only one Account detail at a time 
    @auraEnabled(cacheable = true)
    public static List<Bank_Account__c> fetchAccountDetail(String getValue)
    {
        List<Bank_Account__c> bankAccountNumberList = [SELECT Id,Name,Account_Type__c ,Branch__r.Name ,Opening_Amount__c ,Total_Amount__c FROM Bank_Account__c WHERE Name = :getValue];
        return bankAccountNumberList;
    }
    
    @auraEnabled
    //Deposit money to related Bank Account Number
    public static List<Bank_Account__c> depositMoneyToAccount(String accountNumber ,Integer Amount)
    {
        List<Bank_Account__c> bankAccountNumberList = [SELECT Id,Name ,Opening_Amount__c ,Total_Amount__c FROM Bank_Account__c WHERE Name = :accountNumber];
        Set<String> setAccNo = new Set<String>{accountNumber};
        Map<String,String> accNameToIdMap = getBankAccountIdByNo(setAccNo);
        for(Bank_Account__c bank : bankAccountNumberList){
            //bank.Last_Deposit__c = Amount;
            bank.Last_Transaction_Time__c=System.now();
            bank.Total_Amount__c = bank.Total_Amount__c+Amount;
            Transaction__c objTxn = new Transaction__c();
            objTxn.Bank_Account__c = accNameToIdMap.get(accountNumber);
            objTxn.Type__c = 'Credit';
            objTxn.Amount__c=amount;
            insert objTxn;
        }
        update bankAccountNumberList;
        //System.debug('Data :'+bankAccountNumberList);
        return bankAccountNumberList;
    }
    
    @auraEnabled
    //Withdraw money to related Bank Account Number
    public static List<Bank_Account__c> withdrawMoneyToAccount(String accountNumber ,Integer Amount)
    {
        List<Bank_Account__c> bankAccountNumberList = new List<Bank_Account__c>();
        Set<String> setAccNo = new Set<String>{accountNumber};
        Map<String,String> accNameToIdMap = getBankAccountIdByNo(setAccNo);
        if(accountNumber != null && Amount != null){
            bankAccountNumberList = [SELECT Id,Name ,Opening_Amount__c ,Total_Amount__c FROM Bank_Account__c WHERE Name = :accountNumber];
            for(Bank_Account__c bank : bankAccountNumberList){
                if(bank.Total_Amount__c > Amount){
                    bank.Total_Amount__c = bank.Total_Amount__c - Amount;
                    bank.Last_Transaction_Time__c=System.now();
                    //bank.Last_Withdraw__c = Amount;
                    Transaction__c objTxn = new Transaction__c();
                    objTxn.Bank_Account__c = accNameToIdMap.get(accountNumber);
                    objTxn.Type__c = 'Debit';
                    objTxn.Amount__c=amount;
                    insert objTxn;
                }
                else{
                    return null;
                }
            }
            update bankAccountNumberList;
        }
        return bankAccountNumberList;
        
    }
    @auraEnabled
    public static List<Bank_Account__c> moneyTransfer(String accountNumberFrom,String accountNumberTo, Integer amount){
        
        List<Bank_Account__c> updateBankAccountNumberList = new List<Bank_Account__c>();
        Set<String> setAccNo = new Set<String>{accountNumberFrom,accountNumberTo};
        Map<String,String> accNameToIdMap = getBankAccountIdByNo(setAccNo);
        List<Transaction__c> txnList = new List<Transaction__c>();
        if(accountNumberFrom != null && accountNumberTo != null && amount != null){
            Map<String ,Bank_Account__c> bankAccountMap = new Map<String ,Bank_Account__c>();
            //List<Bank_Account__c> bankAccountNumberList = [SELECT Id,Name,Opening_Amount__c,Last_Withdraw__c,Total_Amount__c FROM Bank_Account__c WHERE Name IN (accountNumberFrom , accountNumberTo)];
            List<Bank_Account__c> bankAccountNumberList = [SELECT Id,Name,Opening_Amount__c,Total_Amount__c FROM Bank_Account__c WHERE Name = : accountNumberFrom OR Name = : accountNumberTo];
            for(Bank_Account__c  bank : bankAccountNumberList){
                if(bank.Name != null){
                    bankAccountMap.put(bank.Name , bank);
                }
            }
            //System.debug('Map :'+bankAccountMap);
            for(Bank_Account__c  bank : bankAccountNumberList){
                if(bank.Name == accountNumberFrom && bank.Total_Amount__c > amount && !bankAccountMap.isEmpty()){
                    bank.Total_Amount__c = bank.Total_Amount__c - amount;
                    bank.Last_Transaction_Time__c=System.now();
                    //bank.Last_Withdraw__c = amount;
                    //Bank_Account__c bankAccount = new Bank_Account__c();
                    Bank_Account__c obj = bankAccountMap.get(accountNumberTo);
                    //System.debug('Obj :'+obj);
                    //bankAccount.Id = obj.Id;
                    //bankAccount.Name = obj.Name;
                    obj.Total_Amount__c = obj.Total_Amount__c + amount;
                    obj.Last_Transaction_Time__c = System.now();
                    //obj.Last_Deposit__c = amount;
                    Transaction__c objTxn = new Transaction__c();
                    objTxn.Bank_Account__c = accNameToIdMap.get(accountNumberFrom);
                    objTxn.Type__c = 'Debit';
                    objTxn.Amount__c=amount;
                    txnList.add(objTxn);

                    Transaction__c objTxn1 = new Transaction__c();
                    objTxn1.Bank_Account__c = accNameToIdMap.get(accountNumberTo);
                    objTxn1.Type__c = 'Credit';
                    objTxn1.Amount__c=amount;
                    txnList.add(objTxn1);
                    
                    updateBankAccountNumberList.add(bank);
                    updateBankAccountNumberList.add(obj);
                }
                                
            }
            if(!txnList.isEmpty()){
                insert txnList;
            }
            update updateBankAccountNumberList;
        }
        //System.debug('A/C-285784390 :'+updateBankAccountNumberList[0].Total_Amount__c);
        //System.debug('A/C-285784396 :'+updateBankAccountNumberList[1].Total_Amount__c);
        
        return updateBankAccountNumberList;
        
    }
    
    private static Map<String,String> getBankAccountIdByNo(Set<String> setAccNo) {
        List<Bank_Account__c> lstBankAcc = [SELECT Id, Name,Branch__r.Name 
                                            FROM Bank_Account__c 
                                            WHERE Name IN : setAccNo ];
        Map<String,String> bankAccNameToIdMap = new Map<String,String>();
        for(Bank_Account__c objBank : lstBankAcc) {
            bankAccNameToIdMap.put(objBank.Name,objBank.Id);
        }
        return bankAccNameToIdMap;
    }
}