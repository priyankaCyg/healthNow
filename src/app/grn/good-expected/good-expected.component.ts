import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { goodsExpectedMaster } from 'src/app/model/goodsExpected.model';
import { Router } from '@angular/router';
import { config } from 'src/config';

@Component({
  selector: 'app-good-expected',
  templateUrl: './good-expected.component.html',
  styleUrls: ['./good-expected.component.css']
})
export class GoodExpectedComponent implements OnInit {

  goodsList: goodsExpectedMaster[] = [];
  noRecordFound: string;

  constructor(private httpService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getGoodsList();
    this.noRecordFound = config.noRecordFound;
  }

  //Function to get goods expected list
  getGoodsList() {
    var dataToSend = {
      "iRequestID": 2342,
      "iUserID": 12
    }
    this.httpService.callPostApi(dataToSend).subscribe(
      data => {
        this.goodsList = data.body;
      },
      error => console.log(error)
    );
  }

  //GRN button click function
  grnClick(goodsData) {
    localStorage.setItem('goodsDetails', JSON.stringify({ goodsData }));
    this.router.navigate(['/grn/receive-product']);
  }

}