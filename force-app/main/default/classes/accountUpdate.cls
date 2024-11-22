public class accountUpdate implements schedulable {
    public void execute(Schedulablecontext SC) {
        accountInsert b = new accountInsert(); // Your batch class
        database.executeBatch(b,200);
    }
}