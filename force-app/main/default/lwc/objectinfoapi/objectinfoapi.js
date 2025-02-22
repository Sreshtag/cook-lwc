import { LightningElement, wire  } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry'
import ACCOUNT_OBJECT from '@salesforce/schema/Account'



export default class Objectinfoapi extends LightningElement {
    objectApiName
    treeModel;
    error;
    @wire(getObjectInfo,{objectApiName : "$objectApiName"})objectInfo;
    handlebuttonclick(){
        this.objectApiName = this.template.querySelector('lightning-input').value
    }
    get objectInfoStr(){return this.objectInfo?JSON.stringify(this.objectInfo.data, null, 2):'';}

    @wire(getPicklistValues,{recordTypeId :'012dL0000054d4j',fieldApiName:INDUSTRY_FIELD})picklistvalues;
    @wire(getPicklistValuesByRecordType,{objectApiName:ACCOUNT_OBJECT,recordTypeId:'012dL0000054d4jQAA'})wiredValues({ error, data }) {
        if (data) {
            this.treeModel = this.buildTreeModel(data.picklistFieldValues);
            this.error = undefined;
        } else {
            this.error = error;
            this.treeModel = undefined;
        }
    }

    buildTreeModel(picklistValues) {
        const treeNodes = [];
        Object.keys(picklistValues).forEach((picklist) => {
            treeNodes.push({
                label: picklist,
                items: picklistValues[picklist].values.map((item) => ({
                    label: item.label,
                    name: item.value
                }))
            });
        });
        return treeNodes;
    };

}