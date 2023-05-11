import { Component, OnInit, ViewChild } from '@angular/core';
import { ShareresultService } from '../shareresult.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {Business} from '../business';
import { ResetformService } from '../resetform.service';
import { BackendService } from '../backend.service';
import {MatCardModule} from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs'; 
import { GoogleMapsModule } from '@angular/google-maps'
import {Review} from '../review';
import {Reservation, ReservationList} from '../reservation'
//import * as $ from 'jquery'
declare var $: any;

@Component({
  selector: 'app-detailcard',
  templateUrl: './detailcard.component.html',
  styleUrls: ['./detailcard.component.css']
})
export class DetailcardComponent implements OnInit {

  Detail:any = {};
  BusiName: string ='';
  BusiAddr: string ='';
  BusiCate:string ='';
  BusiPhone:string='';
  BusiPrice:string='';
  BusiStat:string='';
  BusiLink:string='';
  BusiImgUrl:string[]=[];
  twitterUrl:string='';
  fbUrl:string='';
  lat:number=38.9938386;
  lng:number=-77.2515373;
  mapOptions:google.maps.MapOptions={
    center: { lat: 38.9938386, lng: -77.2515373 },
    zoom : 14
  };
  mapmarker: google.maps.LatLngLiteral = {lat: 38.9938386, lng: -77.2515373};
  REVIEWLIST: Review[] = [];
  review:any = {};
  isVisible = false;
  isReserved = false;
  infoForm: FormGroup;
  todaydate = new Date();
  reserveitem: Reservation ={};
  ID:string = '';
  reservedIndex:number = -1;
  stJson: ReservationList;

  constructor(
    private shareService: ShareresultService,
    private resetService: ResetformService,
    private backService: BackendService,
    private formBuilder: FormBuilder
  ) { 
    this.shareService.getDetailId().subscribe(data => {
      this.checkReserved(data);
      this.id2detail(data);
      this.id2reviews(data);
      this.isVisible = true;
      this.ID = data;
    });

    this.resetService.isVisibleSource.subscribe((isVisible) => {
      console.log('reset form called', isVisible); 
      if(isVisible==false) this.resetCard();
    });

  }

  ngOnInit(): void {
    this.infoForm = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        date: new FormControl('', Validators.required),
        timehour: new FormControl('', Validators.required),
        timeminute: new FormControl('', Validators.required)
      }
      , { updateOn: 'submit' }
    );
  }

  id2detail(data:any){
    this.backService.fetchYelpdetail(data).subscribe(result => {
      console.log(result);
      this.Detail = result;
      this.BusiName = this.Detail.name;
      this.BusiAddr = '';
      for(var i=0; i<this.Detail['location']['display_address'].length; i++){
          this.BusiAddr += this.Detail['location']['display_address'][i];
          this.BusiAddr += " ";
      }
      this.BusiStat = this.Detail['is_closed'];
      this.BusiCate = "";
      for(var i=0; i<this.Detail['categories'].length;i++){
        this.BusiCate += this.Detail['categories'][i].title;
          if(i<this.Detail['categories'].length-1) this.BusiCate += " | ";
      }
      this.BusiPhone = this.Detail['phone'];
      this.BusiPrice = this.Detail['price'];
      this.BusiLink = this.Detail['url'];
      if(this.Detail.photos.length > 0){
        for(var i=0; i<this.Detail.photos.length; i++){
            this.BusiImgUrl[i] = this.Detail.photos[i];
        }
      }
      //console.log("imglist",this.BusiImgUrl);
      this.twitterUrl = "https://twitter.com/intent/tweet?text=Check%20"+ this.BusiName + "%20on%20Yelp.&url=" + this.BusiLink;
      this.fbUrl = "https://www.facebook.com/sharer/sharer.php?u=" + this.BusiLink;
      this.lat = this.Detail['coordinates']['latitude'];
      this.lng = this.Detail['coordinates']['longitude'];
      this.mapOptions = {
        center: { lat: this.lat, lng: this.lng },
        zoom : 14
      }
      this.mapmarker = { lat: this.lat, lng: this.lng };
      console.log("position", this.lat, this.lng);
    });
    
  }

  imglist = this.BusiImgUrl;
  reviewlist = this.REVIEWLIST;

  id2reviews(data:any){
    this.backService.fetchYelpreview(data).subscribe(data => {
      console.log("reviews:",data);
      this.review = data;
      var list = this.review.reviews;
      console.log("list:",list);
      for(var i=0; i<list.length; i++){
        this.REVIEWLIST[i] = {};
        this.REVIEWLIST[i].name = list[i].user.name;
        var s = list[i].rating;
        this.REVIEWLIST[i].rating = "Rating: " + s.toString() +"/5";
        this.REVIEWLIST[i].comment = list[i].text;
        var ss = list[i].time_created;
        this.REVIEWLIST[i].date = ss.split(" ")[0]; 
      }
    });
  }

  backClick(){
    this.resetCard();
    this.resetService.showTableSource.next(true);
  }

  reserveClick(){
    if(this.isReserved == false){
      ($("#myModal")).modal('show');

    }
    else{//cancel reservation
      if(this.reservedIndex>=0){
        this.stJson.list?.splice(this.reservedIndex,1);
        localStorage.setItem("reservationList", JSON.stringify(this.stJson));
      }
      alert("reservation cancelled!");
      this.isReserved = false;
    }
  }

  checkReserved(id:any){
    var storage = localStorage.getItem("reservationList");
    if(storage!=null) {
      this.stJson = JSON.parse(storage);
      console.log(this.stJson);
      if(this.stJson.list != null && this.stJson.list.length!=0) {
        for(var i =0; i<this.stJson.list.length; i++){
          if(this.stJson.list[i].id == id){//is reserved
            this.isReserved = true;
            this.reservedIndex = i;
          }
        }
      }
    }
  }

  onSubmit(){
    this.infoForm.markAllAsTouched();
    if(this.infoForm.valid){
      console.log("email", this.infoForm.get("email")?.value);
      console.log("d", this.infoForm.get("date")?.value);
      console.log("h", this.infoForm.get("timehour")?.value);
      console.log("m", this.infoForm.get("timeminute")?.value);

      this.reserveitem.email = this.infoForm.get("email")?.value;
      this.reserveitem.date = this.infoForm.get("date")?.value;
      this.reserveitem.id = this.ID;
      this.reserveitem.name = this.BusiName;
      this.reserveitem.time = this.infoForm.get("timehour")?.value + ":" +this.infoForm.get("timeminute")?.value;
      //this.shareService.sendReservation(this.reserveitem);

      if(localStorage.getItem("reservationList")===null){
        var list: ReservationList = {};
        list.list = [];
        list.list.push(this.reserveitem);
        localStorage.setItem("reservationList", JSON.stringify(list));
      }
      else{
        var storage = localStorage.getItem("reservationList");
        if(storage!=null) {
          var stJson: ReservationList = JSON.parse(storage);
          stJson.list?.push(this.reserveitem);
          localStorage.setItem("reservationList", JSON.stringify(stJson));
        }
      }
    

      alert("reservation created!");
      this.infoForm.reset();
      ($("#myModal")).modal('hide');
      this.isReserved = true;
    }
  }

  closeModal(){
    this.infoForm.reset();
  }

  resetCard(){
    this.BusiName ='';
    this.BusiAddr ='';
    this.BusiCate ='';
    this.BusiPhone ='';
    this.BusiPrice ='';
    this.BusiStat ='';
    this.BusiLink ='';
    this.BusiImgUrl =[];
    this.twitterUrl ='';
    this.fbUrl ='';
    this.REVIEWLIST = [];
    this.isVisible = false;
    this.isReserved = false;
  }
}
