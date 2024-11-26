import { LightningElement } from 'lwc';
import getoperation from '@salesforce/apex/createJob.operation'

export default class CreateRecord extends LightningElement {
  col
  dataInTable
  columns
  value = '';
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
  handleOperation(){
    
  }
  handleOptionChange(){

  }
  changeHandler(event) {
    const coloumns = []
    const data = []
    const arr = event.target.value.split('\n');
    this.col = arr[0].split("\t")
    this.col.forEach(element => {
      coloumns.push({ label: element, fieldName: element, type: 'text' })
    });
    for (let i = 1; i < arr.length; i++) {
      const tableData = {}
      const linedata = arr[i].split("\t")
      if (coloumns.length == linedata.length) {
        for (let j = 0; j < coloumns.length; j++) {
          tableData[coloumns[j].fieldName] = linedata[j]
        }
        data.push(tableData)
      }
    }
    this.dataInTable = data
    this.columns = coloumns
    console.log("This is columns data", JSON.stringify(coloumns))
    console.log("This is Data in table", JSON.stringify(data))
  }

  handleOnclick(){
    
    
  }

}