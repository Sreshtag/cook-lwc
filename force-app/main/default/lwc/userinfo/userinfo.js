// wireGetRecordDynamicContact.js
import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

const FIELDS = ["User.FirstName", "User.LastName", "User.ProfileId"];

export default class Userinfo extends LightningElement {
  recordId = "005dL0000072EuzQAE";

  @wire(getRecord, { recordId: "$recordId", fields: FIELDS })
  contact;

  get fname() {
    return this.User.data.fields.FirstName.value;
  }

  get lname() {
    return this.User.data.fields.LastName.value;
  }

  get prf() {
    return this.User.data.fields.ProfileId.value;
  }

}