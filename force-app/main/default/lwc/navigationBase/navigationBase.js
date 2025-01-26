import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class NavigationBase extends NavigationMixin(LightningElement) {
    navigateToAccountHome() {
    this[NavigationMixin.Navigate]({
    type: 'standard__objectPage',
    attributes: {
    objectApiName: 'Account',
    actionName: 'home'
    }
    });
    }
    navigateToAccountRecordView() {
        this[NavigationMixin.Navigate]({
        type: "standard__recordPage",
        attributes: {
        recordId: "001dL00000RVlejQAD",
        objectApiName: "Account",
        actionName: "view",
        },
        });
        }
    navigateToRecordList() {
            this[NavigationMixin.Navigate]({
            type: "standard__recordRelationshipPage",
            attributes: {
            recordId: "001dL00000RVlejQAD",
            objectApiName: "Account",
            relationshipApiName: "Contacts",
            actionName: "view",
            },
            });
        }
}