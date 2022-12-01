import { LightningElement } from 'lwc';

export default class ChildLwc extends LightningElement {
    subtractHandler() {
        this.dispatchEvent(new CustomEvent('subtract'));
        //console.log('subtract');
    }
    addHandler() {
        this.dispatchEvent(new CustomEvent('add'));
        //console.log('add');
    }
    multiplyHandler(event){
        const valueMulptiply = event.target.value;
        //alert(valueMulptiply);
        this.dispatchEvent(new CustomEvent('multiply',{detail:valueMulptiply}));
    }
    divideHandler(event){
        const valueDivide = event.target.value;
        this.dispatchEvent(new CustomEvent('divide' ,{detail:valueDivide}));
    }
}