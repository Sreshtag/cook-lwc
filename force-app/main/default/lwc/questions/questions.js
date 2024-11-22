import { LightningElement } from 'lwc';

export default class Questions extends LightningElement {
    selected={}
    questions = [
        {
            id:"Question1",
            question:"What is my name",
            answers:{
                a:"Sreshta",
                b:"weshta",
                c:"adrustha"
            },
            correctans:"c"
            
        },
        {
            id:"Question1",
            question:"What is my name",
            answers:{
                a:"Sreshta",
                b:"weshta",
                c:"adrustha"
            },
            correctans:"c"
        },
        {
            id:"Question1",
            question:"What is my name",
            answers:{
                a:"Sreshta",
                b:"weshta",
                c:"adrustha"
            },
            correctans:"c"
        }
    ]
    changeHandler(event){
        const{name,value} =event.target
        console.log(name,value)
        this.selected={...this.selected,[name]:value}
        console.log(JSON.stringify(this.selected))
    }
    onsubmitHandler(){

    }
}