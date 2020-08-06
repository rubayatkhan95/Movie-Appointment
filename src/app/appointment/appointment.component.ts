import { Component, OnInit , NgModule, Injectable, ElementRef, ViewChild, AfterViewInit, OnDestroy,} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppointmentModel } from '../model/appointment.model';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements  OnInit {
  userdata: AppointmentModel = new AppointmentModel();
  appopintmentForm: FormGroup;
  foods;
  @ViewChild('first', { read: ElementRef }) firstName: ElementRef<HTMLElement>;
  @ViewChild('last', { read: ElementRef }) lastName: ElementRef<HTMLElement>;
  @ViewChild('email', { read: ElementRef }) email: ElementRef<HTMLElement>;

  constructor(private formBuilder: FormBuilder,private router : Router) { }

  ngOnInit(): void {
    var movieList = ["Titanic" ,"Titan", "Cindrella"];
    localStorage.setItem("names", JSON.stringify(movieList));
    var storedNames = JSON.parse(localStorage.getItem("movieList"));
    this.foods = [
      {value: '4:00 – 5:00'},
      {value: '5:00 – 6:00'},
      {value: '6:00 – 7:00'}
    ];
    this.appopintmentForm = this.formBuilder.group({
      "firstName": [this.userdata.firstName, [
        Validators.minLength(1)
      ]],
      "lastName": [this.userdata.lastName, [
        Validators.minLength(1)
      ]],
      "email": [this.userdata.email, [
        Validators.email
      ]],
      "phone": [this.userdata.phone, [
        Validators.minLength(11)
      ]],
      "address": [this.userdata.address, [
        Validators.minLength(1)
      ]],
      "age": [this.userdata.age, [

      ]],
      "date": [this.userdata.email, [
        //Validators.email
      ]],
      "time": [this.userdata.time, [
        //Validators.email
      ]],

    })
  }

  SubmitForm (){
    var userdata = this.userdata;
    localStorage.setItem("userdata", JSON.stringify(userdata));
    var user = JSON.parse(localStorage.getItem("userdata"));
    console.log(user)
    if(this.userdata.time == "6:00 – 7:00"){
      alert("Time slot is unavailable")
    }
    else{
      this.router.navigate(['lists'])
    }

   

  }

}
