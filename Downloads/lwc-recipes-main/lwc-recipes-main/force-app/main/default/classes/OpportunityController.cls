public with sharing class OpportunityController {
    
    @AuraEnabled( cacheable = true )
    public static List < Opportunity > fetchOpptys(){
        
        return [
            SELECT Id, Name, AccountId, Account.Name, Amount
            FROM Opportunity LIMIT 10
        ];
        

    }
}