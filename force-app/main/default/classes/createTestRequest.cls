public with sharing class createTestRequest {
    @AuraEnabled
    public static String getHealthData(){
         Http h = new Http();
         HttpRequest req = new HttpRequest();
         HttpResponse res = new HttpResponse();
         req.setMethod('GET');
         req.setEndpoint('https://sreshtag-dev-ed.trailblaze.my.salesforce.com/services/apexrest/healthdata');
         req.setHeader('Authorization', 'Bearer 00DdM000000XEQs!AQEAQJVfO85q9wpMJ5DFYncfaU0KCoGpSaVb_MYUrcRJj8A6ms7AhVY5K9RRV2DyeJ.Glr0RDe4Ik1rDA16nR41bpL64TFmH');
         res = h.send(req);
         String responsebody = res.getBody();
         return responsebody;
    }
   
}