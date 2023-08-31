import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend.service';
import { SearchUtility } from '../search-utility';
import { ShareresultService } from '../shareresult.service';
import { ResetformService } from '../resetform.service';
import {Reservation} from '../reservation'
import {Observable} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';


@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {

  infoForm;
  lat: string;
  lng: string;
  busiResult: any;
  wordlist: any;
  isLoading = false;
  autoResult:any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private backService: BackendService,
    private shareService: ShareresultService,
    private resetService: ResetformService
  ) {
    this.infoForm = new FormGroup(
      {
        keyword: new FormControl('', Validators.required),
        distance: new FormControl(''),
        category: new FormControl('Default'),
        location: new FormControl(''),
        auto: new FormControl(false)
      }
    );
  }

  onSubmit(): void{
    console.log('Your order has been submitted ', this.infoForm.value);
    if(this.infoForm.get("auto")?.value == false){
      this.addr2loc();
    }
    let miles = this.infoForm.get("distance")?.value;
    if(miles != ''){
      miles = Math.floor((Number(miles)*1609.34)).toString();
    }
    let object: SearchUtility ={
      keyword: this.infoForm.get("keyword")?.value,
      lat: this.lat,
      lng: this.lng,
      categories: this.infoForm.get("category")?.value,
      radius: miles
    } ;
    let s: string = "term=" + object.keyword + "&latitude=" + object.lat +"&longitude=" + object.lng + "&categories=" + object.categories + "&radius=" + object.radius;
    //let s: string = object.keyword +";" + object.lat + ";" + object.lng + ";" + object.categories + ";" + object.radius;
    this.backService.fetchYelputil(s).subscribe(data => {this.busiResult=data;console.log(this.busiResult);this.showTable(this.busiResult);});
  }

  showTable(result: any){
    this.busiResult = result;
    console.log(this.busiResult);
    this.shareService.sendResult(this.busiResult);
  }

  resetForm(){
    this.getAuto();
    this.infoForm.get("location")?.enable();
    this.resetService.isVisibleSource.next(false);
    this.ngOnInit();
    console.log('resetForm() is called',this.infoForm.value);
  }

  ngOnInit(): void {
    this.infoForm = new FormGroup(
      {
        keyword: new FormControl('', Validators.required),
        distance: new FormControl(''),
        category: new FormControl('Default'),
        location: new FormControl(''),
        auto: new FormControl(false)
      }
    );
      /* Disable Location input field when auto is checked */
    this.infoForm.get("auto")?.valueChanges.subscribe(selectedValue => {
      console.log('auto value changed')
      if(selectedValue == true){
        this.infoForm.get("location")?.setValue("");
        this.infoForm.get("location")?.disable();
        this.autoGetLoc();
      }
      else{
        this.infoForm.get("location")?.enable();
      }
    });

    this.infoForm.get("keyword")?.valueChanges.pipe(
      debounceTime(300),
      tap(() => (this.isLoading = true)),
      switchMap((value) =>
        this.backService
          .fetchYelpauto(value as string)
          .pipe(finalize(() => (this.isLoading = false)))
      )
    )
    .subscribe((words) => {
      //this.wordlist = words;
      console.log(words);
      this.autoResult = words;
      let list:string[] = [];
      for(var i=0; i< this.autoResult.categories.length; i++){
        list[i] = this.autoResult.categories[i].title;
      }
      for(var i=Number(this.autoResult.categories.length); i< this.autoResult.categories.length+this.autoResult.terms.length; i++){
        //console.log("terms",this.autoResult.terms[i-this.autoResult.categories.length].text);
        list[i] = this.autoResult.terms[i-this.autoResult.categories.length].text;
      }
      this.wordlist = list;
      console.log(this.wordlist);
    });

  }

  getAuto(){
    this.backService.fetchYelpauto("sushi").subscribe(data => console.log("auto", data));
  }

  autoGetLoc(){
    let url = "https://ipinfo.io/?token=cf377c256f76d5";
    this.http
    .get<any>(url)
    .subscribe(data => {
      console.log(data);
      this.lat = data["loc"].split(',')[0];
      this.lng = data["loc"].split(',')[1];
      console.log(this.lat, this.lng);
    });
  }
  
  addr2loc(){
    let addressKey = this.infoForm.get("location")?.value;
    addressKey = addressKey?.trim().replace(', ', '+').replace(' ', '+').replace(',', '+');
    let geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+ addressKey +"&key=";// add api key string from config file 
    this.http
    .get<any>(geocodeURL)
    .subscribe(data => {
      console.log(data);
      if(data.status=="ZERO_RESULTS"){//invalid address
        console.log("invalid address")
        alert("Invalid address input!")
      }
      else{
          //console.log(JSON.parse(xhr.responseText).results[0].geometry.location.lat.toString());
          this.lat = data.results[0].geometry.location.lat.toString();
          this.lng = data.results[0].geometry.location.lng.toString();
          console.log('addr2loc result:',this.lat, this.lng);
      }
    });
  }

}
