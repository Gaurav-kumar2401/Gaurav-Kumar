import { LightningElement ,api } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api itemName="Gaurav Kumar";

    @api handleChangeMethod(){
        this.itemName="Inside child Method";
    }
}