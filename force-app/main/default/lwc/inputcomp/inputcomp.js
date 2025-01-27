import { LightningElement } from 'lwc';

export default class Inputcomp extends LightningElement {
    requestState=true
    recordId = '005dL0000072EuzQAE'
    mirrorAccessCheck(event){
        event.preventDefault();
        const{name,value} = event.target
        if(name=="user1"){
            console.log("name"+name+ "value"+ value)
        }
        if(name=="user2"){
            console.log("name" + name +"value"+ value)
        }

    }
    onchangeinput(event){
        console.log(event.target.value)
    }
}