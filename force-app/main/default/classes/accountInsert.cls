global class accountInsert implements Database.Batchable <sObject> , Database.Stateful{
    public set<Id> AccountsPassed = new set<id>();
    public set<Id> AccountsFailed = new set<id>();
    public Integer NumberofAccs;

    public Database.QueryLocator start(Database.BatchableContext BC){
        String query = 'SELECT Id,Name from Account';
        return Database.getQueryLocator(query);
    }

    public void Execute(Database.BatchableContext BC , List<Account> scope){
        List<Account> Accs = new List<Account>();
        for (Account a:scope){
            a.Industry ='Now implementing schedulable';
            Accs.add(a);
        }
        Database.SaveResult[] myresult = Database.Update(scope,false);

        for(Integer i=0;i<myresult.size();i++){
            if(myresult.get(i).isSuccess()){
                AccountsPassed.add(myresult.get(i).Id);
            }
            else{
                AccountsPassed.add(myresult.get(i).Id);
            }
        }
    }
    public void Finish(Database.BatchableContext BC){
    }

}