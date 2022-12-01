import { LightningElement } from 'lwc';

export default class LwcParent extends LightningElement {
    startNumber;
    changeHandler(event) {
        this.startNumber=parseInt(event.target.value);
        
    }
    callChildMEthod(){

        this.template.querySelector('c-lwc-child').childMethod();
    }
}