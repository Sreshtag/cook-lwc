public with sharing class createJob {

    @AuraEnabled
    public static string createJob(String Body,String operationInfo){
        Http h= new Http();
        HttpRequest req = new HttpRequest();
        HttpResponse res = new HttpResponse();
        req.setMethod('POST');
        req.setBody(operationInfo);
        req.setEndpoint('https://sreshta-gollapally-dev-ed.develop.my.salesforce.com/services/data/v61.0/jobs/ingest');
        req.setHeader('Authorization', 'Bearer 00DdL00000BC2uk!AQEAQFzmjaXsaXuurmDLqhEUJzuxblI55So_OFddeglazEh8ockmr_dxovV6vhrOIeQ6zZV0VHYcj62Oi_QDbPhSUDkjXvha');
        req.setHeader('Content-Type', 'application/json');
        res= h.send(req);
        system.debug(res.getBody());
        Map<String, Object> m =   (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
        String jobId=(String) m.get('id');
        uploadData (jobId,Body);
        return jobId;
    }
    public static string uploadData(String jobId, String Body){
        Http h= new Http();
        HttpRequest req = new HttpRequest();
        HttpResponse res = new HttpResponse();
        req.setMethod('PUT');
        req.setBody(Body);
        req.setEndpoint('https://sreshta-gollapally-dev-ed.develop.my.salesforce.com/services/data/v61.0/jobs/ingest/'+jobId+'/batches');
        req.setHeader('Authorization', 'Bearer 00DdL00000BC2uk!AQEAQFzmjaXsaXuurmDLqhEUJzuxblI55So_OFddeglazEh8ockmr_dxovV6vhrOIeQ6zZV0VHYcj62Oi_QDbPhSUDkjXvha');
        req.setHeader('Content-Type', 'text/csv');
        res= h.send(req);
        system.debug(res);
        system.debug('Response from abortJob function'+abortJob(jobId));
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
        req.setHeader('Authorization', 'Bearer 00DdL00000BC2uk!AQEAQFzmjaXsaXuurmDLqhEUJzuxblI55So_OFddeglazEh8ockmr_dxovV6vhrOIeQ6zZV0VHYcj62Oi_QDbPhSUDkjXvha');
        req.setHeader('Content-Type', 'application/json');
        res= h.send(req);
        return res.getBody();
    }

    @AuraEnabled(cacheable=true)
    public static String getObjects(){
        Http h= new Http();
        HttpRequest req = new HttpRequest();
        HttpResponse res = new HttpResponse();
        req.setMethod('GET');
        req.setEndpoint('callout:BulkyNamed'+'/services/data/v61.0/query/?q=SELECT+QualifiedApiName,IsCustomSetting+FROM+EntityDefinition+where+IsCustomSetting+=+false+order+by+QualifiedApiName');
        req.setHeader('Content-Type', 'application/json');
        res= h.send(req);
        return res.getBody();
    }
}