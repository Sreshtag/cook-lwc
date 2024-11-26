public with sharing class getObjects {
    @AuraEnabled
    public static Map<String,List<String>> getObjects(){
        try {
            Map<String,List<String> > objects= new Map<String,List<String>>();
        for ( Schema.SObjectType o : Schema.getGlobalDescribe().values() ){
            Schema.DescribeSObjectResult objResult = o.getDescribe();
            List<String> fields = new List<String>(objResult.fields.getMap().values());
            objects.put(objResult.getName(),fields);
        }
        return objects;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}