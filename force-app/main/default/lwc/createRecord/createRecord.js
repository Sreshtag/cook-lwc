import { LightningElement} from 'lwc';
import createJob from '@salesforce/apex/createJob.createJob'
import getObjects from '@salesforce/apex/createJob.getObjects'

export default class CreateRecord extends LightningElement {
  requestState = true
  ResponseState = false
  col
  errortem = false
  JobId = ''
  upsert = false
  dataInTable
  columns
  sendString = ""
  operationInfo = { "operation": 'insert', "object": 'Account', "contentType": "CSV", "lineEnding": "CRLF" }
  customSettings=[]
  objects = []
  connectedCallback() {
    getObjects().then(result => {
      const objRecs = JSON.parse(result).records
      objRecs.forEach(object => {
        if (object.IsCustomSetting) {
          this.customSettings.push(object.QualifiedApiName)
        }
        else {
          this.objects.push({ label: object.QualifiedApiName, value: object.QualifiedApiName })
        }
      });
    }).catch(error => {
      console.log(error)
    })
  }
   get operations() {
     return [
       { label: 'Insert', value: 'insert' },
       { label: 'Update', value: 'update' },
       { label: 'Upsert', value: 'upsert' },
       { label: 'Delete', value: 'delete' },
     ];
   }

  get customSettings(){

  }

  // get objects() {
  //   return [
  //     { label: 'Account', value: 'Account' },
  //     { label: 'Contact', value: 'Contact' },
  //     { label: 'Opportunity', value: 'Opportunity' },
  //   ];
  // }

  handleOperation(event) {
    console.log(JSON.stringify(this.objectInfo))
    event.target.value === "update" ? this.update = true : this.update = false
    this.operationInfo.operation = event.target.value
    //console.log(JSON.stringify(this.operationInfo))
  }
  handleOptionChange(event) {
    this.operationInfo.object = event.target.value
    //console.log(JSON.stringify(this.operationInfo))
  }
  
  handleupsert(event) {
    this.operationInfo.externalIdFieldName = event.target.value
  }

  changeHandler(event) {
    const coloumns = []
    const data = []
    const arr = event.target.value.split('\n');
    this.col = arr[0].split("\t")
    this.sendString += this.col.join(",") + "\r\n"
    this.col.forEach(element => {
      coloumns.push({ label: element, fieldName: element, type: 'text' })
    });
    for (let i = 1; i < arr.length; i++) {
      const tableData = {}
      const linedata = arr[i].split("\t")
      this.sendString += linedata.join(",") + "\r\n"
      if (coloumns.length == linedata.length) {
        for (let j = 0; j < coloumns.length; j++) {
          tableData[coloumns[j].fieldName] = linedata[j]
        }
        data.push(tableData)
      }
    }
    this.dataInTable = data
    this.columns = coloumns
  }
  handleOnclick() {
    createJob({ Body: this.sendString, operationInfo: JSON.stringify(this.operationInfo) }).then(result => {
      this.requestState = false
      this.ResponseState = true
      this.JobId = result
    }).catch(error => {
      this.errortem = true
      console.log(error)
    })
  }
}