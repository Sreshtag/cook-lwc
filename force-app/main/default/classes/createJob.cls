public with sharing class createJob {
    @AuraEnabled
    public static void operation( String operationData){
        try {
            system.debug(operationData);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static string createJob(){
        Http h= new Http();
        HttpRequest req = new HttpRequest();
        HttpResponse res = new HttpResponse();
        req.setMethod('POST');
        req.setBody('{'+
            '"operation" : "insert",'+
            '"object" : "Account",'+
            '"contentType" : "CSV",'+
            '"lineEnding" : "CRLF"'+
           ' }');
        req.setEndpoint('https://sreshta-gollapally-dev-ed.develop.my.salesforce.com/services/data/v61.0/jobs/ingest');
        req.setHeader('Authorization', 'Bearer ');
        req.setHeader('Content-Type', 'application/json');
        res= h.send(req);
        system.debug(res);
        return res.getBody();
    }
    public static string uploadData(String jobId){
        Http h= new Http();
        HttpRequest req = new HttpRequest();
        HttpResponse res = new HttpResponse();
        req.setMethod('PUT');
        req.setBody('Name,Industry SOS1,Mechanic');
        req.setEndpoint('https://sreshta-gollapally-dev-ed.develop.my.salesforce.com/services/data/v61.0/jobs/ingest/'+jobId+'/batches');
        req.setHeader('Authorization', 'Bearer ');
        req.setHeader('Content-Type', 'text/csv');
        res= h.send(req);
        system.debug(res);
        return res.getBody();
    }
    public static string abortJob(String jobId){
        Http h= new Http();
        HttpRequest req = new HttpRequest();
        HttpResponse res = new HttpResponse();
        req.setMethod('PATCH');
        req.setBody('{'+
            '"state" : "UploadComplete"'+
           ' }');
        req.setEndpoint('https://sreshta-gollapally-dev-ed.develop.my.salesforce.com/services/data/v61.0/jobs/ingest/'+jobId);
        req.setHeader('Authorization', 'Bearer ');
        req.setHeader('Content-Type', 'application/json');
        res= h.send(req);
        system.debug(res);
        return res.getBody();
    }
}