import { LightningElement, api } from 'lwc';

export default class Clock extends LightningElement {
    timestamp;

    @api
    refresh() {
        this.timestamp = new Date();
        console.log(this.timestamp);
    }
    connectedCallback(){
        this.refresh();
    }
}
