import { LightningElement ,api} from 'lwc';

export default class LwcChild extends LightningElement {
    @api numberCount=0;

    @api childMethod(){
        this.numberCount +=100;
    }
}