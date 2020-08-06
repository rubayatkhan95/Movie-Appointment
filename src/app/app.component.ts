import { Component, OnInit, NgModule, Injectable, ElementRef, ViewChild, AfterViewInit, OnDestroy, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpParams, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { RegisterModel } from './model/register.model';
import { Tile } from './model/search.model';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit, OnDestroy, OnInit {
    datamovie;
    Title;
    Poster;
    Year;
    search;
    errorTitle;
    alterImage;
    errorResponse;
    user: RegisterModel = new RegisterModel();
    registerForm: FormGroup;
    title = 'Movie';
    tiles: Tile[];
    @ViewChild('first', { read: ElementRef }) firstName: ElementRef<HTMLElement>;
    firstNameAutofilled: boolean;
    submit: boolean;
    constructor(private _autofill: AutofillMonitor, private http: HttpClient, private formBuilder: FormBuilder, public router : Router) { }
    
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            "name": [this.user.name, [
                Validators.minLength(3)
            ]]
        })

    }

    clickHandler(){
        this.router.navigate(['appointments'])
      }

    getMovieById() {
        let url = "http://www.omdbapi.com/"
        let search = "?i=" + this.user.name;
        let apikey = "&apikey=411d6e13"
        let titleArray = [];
        titleArray = []
        this.tiles = titleArray;
        this.http.get(url + search + apikey).subscribe(
            data => {
                this.datamovie = data;
                this.search = this.datamovie.Search;
                this.errorResponse = this.datamovie.Response == "False" ? this.datamovie.Response : null;
                if (this.errorResponse != null) {
                    this.errorTitle = "Movie not found!"
                }
                else {
                    this.errorTitle = "Sharing a few of our favourite movies";
                    let arrayElement = {
                        Title: this.datamovie.Title,
                        Poster: this.datamovie.Poster,
                        Year: this.datamovie.Year,
                        cols: 1,
                        rows: 1,
                        color: 'white'
                    }
                    this.tiles.push(arrayElement)
                }
            },
            error => {
                console.log('Could not load todos.');
            }
        )
    }

    Submit() {
        this.alterImage = "https://www.google.com/images/srpr/logo11w.png"
        let searchField = this.user.name;
        if (searchField.length < 3) {
            alert("Please enter at least 3 characters")
        } else {
            let key = "tt3896198";
            let url = "http://www.omdbapi.com/"
            let search = "?s=" + this.user.name;
            let apikey = "&apikey=411d6e13"
            let titleArray = [];
            titleArray = []
            this.tiles = titleArray;
            this.http.get(url + search + apikey).subscribe(
                data => {
                    this.datamovie = data;
                    this.search = this.datamovie.Search;
                    this.errorResponse = this.datamovie.Response == "False" ? this.datamovie.Response : null;
                    if (this.errorResponse != null) {
                        this.getMovieById()
                        this.errorTitle = "Movie not found!"
                    }
                    else {
                        this.errorTitle = "Sharing a few of our favourite movies";
                        this.search.forEach(item => {
                            let arrayElement = {
                                Title: item.Title,
                                Poster: item.Poster,
                                Year: item.Year,
                                cols: 1,
                                rows: 1,
                                color: "white"
                            }
                            this.tiles.push(arrayElement);
                            this.errorTitle = "Sharing a few of our favourite movies"
                        })
                    }

                },
                error => {
                    console.log('Could not load todos.');
                }
            )
        }

    }
    ngAfterViewInit() {
        this._autofill.monitor(this.firstName)
            .subscribe(e => { this.firstNameAutofilled = e.isAutofilled });
    }
    ngOnDestroy() {
        this._autofill.stopMonitoring(this.firstName);
    }

}