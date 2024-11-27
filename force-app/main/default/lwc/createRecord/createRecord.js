import { LightningElement } from 'lwc';
import createJob from '@salesforce/apex/createJob.createJob'
export default class CreateRecord extends LightningElement {
  col
  JobId
  dataInTable
  columns
  value = '';
  operation
  sendString=""
  get operations() {
    return [
      { label: 'Insert', value: 'Insert' },
      { label: 'Update', value: 'Update' },
      { label: 'Delete', value: 'Delete' },
      { label: 'Undelete', value: 'Undelete' },
    ];
  }
  get objects() {
    return [
      { label: 'one', value: '1' },
      { label: 'two', value: '2' },
      { label: 'three', value: '3' },
    ];
  }
  handleOperation(event){
    this.operation=event.target.value
  }
  handleOptionChange(){

  }

  changeHandler(event) {
    const coloumns = []
    const data = []
    const arr = event.target.value.split('\n');
    this.col = arr[0].split("\t")
    this.sendString+=this.col.join(",")+"\r\n"
    this.col.forEach(element => {
      coloumns.push({ label: element, fieldName: element, type: 'text' })
    });
    for (let i = 1; i < arr.length; i++) {
      const tableData = {}
      const linedata = arr[i].split("\t")
      this.sendString+=linedata.join(",")+"\r\n"
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
  uploadData(){

  }
  handleOnclick(){
    createJob().then(result=>{
      this.JobId=result.Id
      console.log("Job Id",result.Id)

    }).catch(error=>{
      console.log(error)
      console.log("some pichakuntla error")
    })
  }
}