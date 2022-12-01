import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    handleChange(){
        this.template.querySelector("c-child-component").handleChangeMethod();
    }
}