import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-pr-image',
  templateUrl: './view-pr-image.component.html',
  styleUrls: ['./view-pr-image.component.css']
})
export class ViewPrImageComponent implements OnInit {
  images: any[];

    display: boolean;

 viewImage: any[];

  constructor() { }

  ngOnInit(): void {

    this.images = [];
        this.images.push({
            source: 'assets/demo/images/sopranos/sopranos1.jpg',
            thumbnail: 'assets/demo/images/sopranos/sopranos1_small.jpg', title: 'Sopranos 1'
        });
       
    this.viewImage =[
      {sequence: '1', imgName: 'Gluten Free Wheat'},
      {sequence: '3', imgName: 'Gluten Free Wheat'},
      {sequence: '2', imgName: 'Gluten Free Wheat'}
    ];

  }

}
