import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class Currentpageref extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    get currentPageReference() {
        return this.pageRef ? JSON.stringify(this.pageRef, null, 2) : '';
    }
}