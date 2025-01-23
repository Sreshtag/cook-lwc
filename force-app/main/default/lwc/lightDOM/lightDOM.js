import { LightningElement } from 'lwc';

export default class LightDOM extends LightningElement {
    handleButtonClick(){
        this.template.querySelector('p.lightDomParagraph').innerText =
            'Text changed by parent';
    }
}