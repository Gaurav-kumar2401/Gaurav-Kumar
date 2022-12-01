import { LightningElement, track } from 'lwc';

export default class ParentLwc extends LightningElement {
    @track countNumber = 0;
    decrementHandler(){
        this.countNumber--;
    }
    incrementHandler(){
        this.countNumber++;
    }
    handlerMultiply(event){
        const valueForMUltiply = event.detail;
        //alert(valueForMUltiply);
        this.countNumber *= valueForMUltiply;
    }
    handlerDivide(event){
        const valueForDivide = event.detail;
        this.countNumber /= valueForDivide;
    }
}