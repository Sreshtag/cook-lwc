import { LightningElement } from 'lwc';
import alarmasset from '@salesforce/resourceUrl/alarmasset'

export default class AlarmClock extends LightningElement {
    clockmig= alarmasset+'/alarmasset/alarm.png'
    ringtone= new Audio(alarmasset+'/alarmasset/music.mp3')
    currentTime = ""
    hours=[]
    minutes =[]
    meridians=["AM","PM"]
    hourSelected
    meridianSelected
    minSelected
    alarmTime
    isalarmset=false
    alarmTriggered = false
    get allvaluesselected(){
        return !(this.hourSelected && this.minSelected && this.meridianSelected)
    }
    get shakeimg(){
        return this.alarmTriggered ? 'shake' : ''
    }
    connectedCallback(){
        this.createHourOptions()
        this.createMinuteOptions()
        this.currentTimeHandler()
    }

    currentTimeHandler(){
        setInterval(()=>{let dateime = new Date()
            let hour = dateime.getHours()
            let min = dateime.getMinutes()
            let sec = dateime.getSeconds()
            let ampm="AM" 
            if(hour==0){
                hour=12
            }else if (hour >= 12 && hour<= 23){
                hour= hour - 12
                ampm = "PM"
            }
            hour = hour <10? "0" + hour : hour
            min = min <10? "0" + min : min
            sec = sec <10? "0" + sec : sec
    
            this.currentTime = `${hour}:${min}:${sec} ${ampm}`
            if(this.alarmTime===`${hour}:${min}:${ampm}`){
                console.log("alarm triggered")
                this.alarmTriggered = true
                this.ringtone.play()
                this.ringtone.loop = true
            }
        
        },1000)

    }
    createHourOptions(){
        for(let i =1;i<12;i++){
            let val =i<10 ?"0"+i : i 
            this.hours.push(val)
        }
    }
    createMinuteOptions(){
        for(let i =0;i<59;i++){
            let val =i<10 ?"0"+i : i 
            this.minutes.push(val)
        }
    }

    optionhandler(event){
        const{label,value} = event.detail
        if(label=="Hour(s)"){
            this.hourSelected = value

        }
        else if(label=="Minutes(s)"){
            this.minSelected = value

        }
        else if(label=="AM/PM"){
            this.meridianSelected = value

        }else{}
        //console.log("hours"+this.hourSelected)
        //console.log("minutes"+this.minSelected)
        //console.log("AM/PM"+this.meridianSelected)

    }
    setAlarmHandler(){
        this.alarmTime = `${this.hourSelected}:${this.minSelected}:${this.meridianSelected}`
        this.isalarmset=true
    }
    clearAlarmHandler(){
        this.isalarmset=false
        this.alarmTime =''
        this.ringtone.pause()
        this.alarmTriggered = false
        const elements= this.template.querySelectorAll('c-dropdown')
        Array.from(elements).forEach(element => {
            element.reset("")
            
        });
    }
    
}