public class SendEmailApiCallout {
    @AuraEnabled
    public static String sendMail(String email, String subject, String body) {
        try{
            String username = 'b40405a7b1416fb68fb078f5659066ab';
            String password = '438a5c4a212e871d36aa388b11843420';

            Http h = new Http();
            // body to pass in post request
            String requestBody = '';
            requestBody += '{"Messages":[{"From":{"Email":"gaurav.k@techmatrixconsulting.com","Name":"Gaurav Kumar"},"To":[{';
            requestBody += '"Email" : ' + '"' + email + '"';
            requestBody += ',"Name":"You"}],';
            requestBody += '"Subject":"' + subject + '",';
            requestBody += '"TextPart":"' + body + '"}]}';
            // Instantiate a new HTTP request, specify the method (POST) as well as the endpoint
            System.debug('Request JSON : ' + requestBody);
            
            HttpRequest req = new HttpRequest();
            req.setEndpoint('https://api.mailjet.com/v3.1/send');
            req.setMethod('POST');
            Blob headerValue = Blob.valueOf(username + ':' + password);
            String authorizationHeader = 'Basic ' + EncodingUtil.base64Encode(headerValue);
            req.setHeader('Authorization', authorizationHeader);
            req.setHeader('Content-Type', 'application/json;charset=UTF-8');
            req.setBody(requestBody);
            
            // Send the post request
            HttpResponse res = h.send(req);
            System.debug('Body : ' + res.getBody());
            return res.getStatus();
            
        }
        catch(exception e){
            System.debug('Error : ' + e.getMessage());
            return e.getMessage();
        }
        
        
    }
}