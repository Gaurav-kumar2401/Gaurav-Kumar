import { LightningElement } from 'lwc';
import images from '@salesforce/resourceUrl/PlayersImages';

export default class CarouselComponent extends LightningElement {
    players = [
        {
            id:"1",
            src:images +'/Images/download.jpg',
            href:"https://en.wikipedia.org/wiki/MS_Dhoni",
            alternativeText:"Image"
        },
        {
            id:"2",
            src:images +'/Images/images.jpg',
            href:"https://en.wikipedia.org/wiki/Virat_Kohli",
            alternativeText:"Image"
        }

    ];

    // players = [
    //     {
    //         id:"1",
    //         src:"https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_640,q_50/lsci/db/PICTURES/CMS/319900/319946.png",
    //         href:"https://en.wikipedia.org/wiki/MS_Dhoni",
    //         alternativeText:"Image"
    //     },
    //     {
    //         id:"2",
    //         src:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Virat_Kohli.jpg/330px-Virat_Kohli.jpg",
    //         href:"https://en.wikipedia.org/wiki/Virat_Kohli",
    //         alternativeText:"Image"
    //     }

    // ];
}