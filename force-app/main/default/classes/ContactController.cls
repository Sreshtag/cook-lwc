public with sharing class ContactController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [
            SELECT
                Id,
                Name,
                FirstName,
                LastName,
                Title
            FROM Contact
            WITH USER_MODE
            LIMIT 10
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(String accId) {
        return [
            SELECT AccountId, Id, FirstName, LastName, Title, Phone, Email
            FROM Contact
            WHERE AccountId = :accId
            WITH SECURITY_ENFORCED
        ];
    }
    @AuraEnabled
    public static string updateContacts(Object data) {
    List<Contact> contactsForUpdate = (List<Contact>) JSON.deserialize(
         JSON.serialize(data),
         List<Contact>.class
    );
    try {
        update contactsForUpdate;
        return 'Success: contacts updated successfully';
    }
    catch (Exception e) {
        return 'The following exception has occurred: ' + e.getMessage();
    }
}
}