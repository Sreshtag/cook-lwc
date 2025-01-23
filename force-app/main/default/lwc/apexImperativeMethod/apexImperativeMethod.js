import { LightningElement } from 'lwc';
import getcontacts from '@salesforce/apex/ContactController.getContacts'

export default class ApexImperativeMethod extends LightningElement {
    contacts;
    error;
    handleLoad() {
        console.log("inside onload of component")
        getcontacts().then(data=>{console.log("got data")
            this.contacts=data
        }).catch(error=>{
            console.log("error")
        this.error=error}
        )
    }
}