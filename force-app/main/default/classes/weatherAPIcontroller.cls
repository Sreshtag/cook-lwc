public with sharing class weatherAPIcontroller {
    @AuraEnabled
    public static String getweatherdata(String city){
        String url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid='+getapikey();
        String res = getresponse(url);
        return(res);
    }
    public static String getresponse(String url){
        Http h= new Http();
        HttpRequest req = new HttpRequest();
        HttpResponse res= new HttpResponse();
        req.setMethod('GET');
        req.setEndpoint(url);
        req.setTimeout(120000);
        res = h.send(req);
        String responsebody = res.getBody();
        return responsebody;
    }

    public static String getapikey(){
        String key =system.label.weatherapikey;
        return key;
    }
    
}