import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormService } from '../services/form.service';

export enum CreateState {
  FAILED = 'FAILED',
  SUCCESS = "SUCCESS",
  IN_PROGRESS = "IN_PROGRESS",
  NOT_STARTED = "NOT_STARTED"
}

export class CreateHTTPResponse {
  public certificate_category: string = "";
  public certificate_token: string = ""
  public certificate_url: string = ""
  public date_range: string = ""
  public degree_name: string = ""
  public description: string = ""
  public hash: string = ""
  public index: string = ""
  public institution_name: string = ""
  public previousHash: string = ""
  public timestamp: string = ""
  public userId: string = ""
} // httpResponse

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  // Form data to pass to home page.
  createResponse: CreateHTTPResponse = new CreateHTTPResponse();

  constructor(
    private router: Router,
    private http: HttpClient,
    private formService: FormService
  ) { } // constructor

  ngOnInit(): void {
    // Reset all bindings and variables
    this.formService.formState = CreateState.NOT_STARTED;
    this.createResponse = new CreateHTTPResponse();
  } // ngOnInit

  public create(form: NgForm) {
    ////// Form Data
    // c_cat: ""
    // certificate: "zcc"
    // contact_id: ""
    // dates: "zxczxc"
    // degree_name: "zxczxc"
    // description: "zxczxc"
    // institution_name: "zxczxc"
    // upload: ""
    // _token: ""
    let jsonData = {
      "userId": "2",
      "certificate_token": form.value.certificate,
      "certificate_url": form.value.upload,
      "certificate_category": form.value.c_cat,
      "institution_name": form.value.institution_name,
      "degree_name": form.value.degree_name,
      "date_range": `${form.value.dates}`,
      "description": form.value.description
    };

    // Send to API
    this.formService.formState = CreateState.IN_PROGRESS;
    this.http.post<CreateHTTPResponse>("https://safe-demo-api.herokuapp.com", JSON.stringify(jsonData)).subscribe(result => {
      this.formService.formState = CreateState.SUCCESS;

      ////// Response Data
      // certificate_category: "Education"
      // certificate_token: "123456789987654321"
      // certificate_url: ""
      // date_range: "May 2022"
      // degree_name: "CS"
      // description: "sad"
      // hash: "0efb37d27d3121b157e4fa0159a73501b7c2e6151baa39791364a0ff79d2b653"
      // index: 1
      // institution_name: "Marist"
      // previousHash: "afb5be4dddafd27f2008cf8904003d39b4d6e7882782b6a8f32aac3cbe6e843f"
      // timestamp: 1636432568
      // userId: "2"
      this.createResponse = new CreateHTTPResponse();
      this.createResponse.certificate_category = result.certificate_category;
      this.createResponse.certificate_token = result.certificate_token;
      this.createResponse.certificate_url = result.certificate_url;
      this.createResponse.date_range = result.date_range;
      this.createResponse.degree_name = result.degree_name;
      this.createResponse.description = result.description;
      this.createResponse.hash = result.hash;
      this.createResponse.index = result.index;
      this.createResponse.institution_name = result.institution_name;
      this.createResponse.previousHash = result.previousHash;
      this.createResponse.timestamp = result.timestamp;
      this.createResponse.userId = result.userId;

      // this.router.navigate(['/home']);
    },
      error => {
        this.formService.formState = CreateState.FAILED;
        this.router.navigate(['/home']);
      });
  } // create

} // CreateComponent
