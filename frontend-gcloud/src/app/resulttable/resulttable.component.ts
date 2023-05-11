import { Component, OnInit } from '@angular/core';
import { ShareresultService } from '../shareresult.service';
import { Subscription } from 'rxjs';
import {Business} from '../business';
import { ResetformService } from '../resetform.service';

@Component({
  selector: 'app-resulttable',
  templateUrl: './resulttable.component.html',
  styleUrls: ['./resulttable.component.css']
})
export class ResulttableComponent implements OnInit {

  Eventsubscription: Subscription;
  ResultData: any;
  RESULTLIST: Business[]=[];
  isVisible: boolean = false;
  noResult:boolean = false;

  constructor(
    private shareService: ShareresultService,
    private resetService: ResetformService
  ) { 
    this.Eventsubscription = this.shareService.getResult().subscribe(data => this.showTable(data));
    this.resetService.isVisibleSource.subscribe((isVisible) => {
      console.log('reset form called', isVisible); 
      if(isVisible==false) this.hideTable();
    });
    this.resetService.showTableSource.subscribe(data => {
      if(data==true) this.isVisible = true;
    })
  }

  ngOnInit(): void {
    this.isVisible = false;
  }

  showTable(result: any){
    let list = result['businesses'];
    console.log(list);
    if(list.length==0){//no results
      this.noResult = true;
      return;
    }
    for(var i = 0; i< list.length; i++){
      //console.log(list[i].name);
      this.RESULTLIST[i] = {};
      this.RESULTLIST[i].name = list[i].name;
      this.RESULTLIST[i].id = list[i].id;
      this.RESULTLIST[i].imgurl = list[i].image_url;
      this.RESULTLIST[i].rating = list[i].rating;
      this.RESULTLIST[i].distance = Number(Math.floor((Number(list[i].distance)/1609.34)));
    }
    this.isVisible = true;
    console.log("check list", this.RESULTLIST);
  }

  deleteRows(){
    this.RESULTLIST = [];
  }

  hideTable(){
    console.log("hidetable is called");
    this.deleteRows();
    this.isVisible = false;
    this.noResult = false;
    //console.log(this.RESULTLIST);
  }

  selectRow(index: number){
    console.log("call select row ", index);
    this.isVisible = false;
    this.shareService.sendDetailId(this.RESULTLIST[index].id);
  }

  busilist = this.RESULTLIST;

}
