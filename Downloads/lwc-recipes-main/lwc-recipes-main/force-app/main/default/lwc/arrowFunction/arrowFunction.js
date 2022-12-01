import { LightningElement, track } from 'lwc';

export default class ArrowFunction extends LightningElement {
   @track result;
    connectedCallback(){
         let callFunction = this.myFunction(100,4);
         this.result=callFunction;
        window.alert("Your Result :"+callFunction);

    }
    myFunction(num1,num2){
        return num1/num2;
    }
}