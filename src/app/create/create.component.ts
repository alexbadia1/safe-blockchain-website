import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormService } from '../services/form.service';
import { USER_ID } from '../app.component';

export enum CreateState {
  FAILED = 'FAILURE',
  SUCCESS = "SUCCESS",
  IN_PROGRESS = "IN_PROGRESS",
  NOT_STARTED = "NOT_STARTED"
}

export class CreateHTTPResponse {
  public certificate_category: string = "";
  public certificate_token: string = "";
  public certificate_url: string = "";
  public date_range: string = "";
  public degree_name: string = "";
  public description: string = "";
  public hash: string = "";
  public index: string = "";
  public institution_name: string = "";
  public previousHash: string = "";
  public timestamp: string = "";
  public userId: string = "";
  public blockType: string = "";
  public createOriginHash: string = "";
} // CreateHTTPResponse

export interface Block {
  certificate_category: string;
  certificate_token: string;
  certificate_url: string;
  date_range: string;
  degree_name: string;
  description: string;
  hash: string;
  index: string;
  institution_name: string;
  previousHash: string;
  timestamp: string;
  userId: string;
  blockType: string
  createOriginHash: string
} // Block

export interface BlockChain {
  blocks: Array<Block>;
} // BlockChain

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  // Form data to pass to home page.
  public createResponse: CreateHTTPResponse = new CreateHTTPResponse();
  public initialFormData: Block | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private formService: FormService
  ) { } // constructor

  ngOnInit(): void {
    // Reset all bindings and variables
    this.formService.formState = CreateState.NOT_STARTED;

    // Initialize form with data if any
    this.initialFormData = this.formService.initialBlock;

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
      "userId": USER_ID,
      "certificate_token": form.value.certificate,
      "certificate_url": form.value.upload,
      "certificate_category": form.value.c_cat,
      "institution_name": form.value.institution_name,
      "degree_name": form.value.degree_name,
      "date_range": `${form.value.dates}`,
      "description": form.value.description,
    };

    // Send to API
    this.formService.formState = CreateState.IN_PROGRESS;
    this.http.post<CreateHTTPResponse>("https://safe-demo-api.herokuapp.com/create", JSON.stringify(jsonData)).subscribe(result => {
      // Makes the success message display on the home screen
      this.formService.formState = CreateState.SUCCESS;

      ////// Parse Response Data
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

      // Go ack to home screen
      this.router.navigate(['']);
    },
      error => {
        // Makes the failed message display on the home screen
        this.formService.formState = CreateState.FAILED;

        // Go back to home screen
        this.router.navigate(['']);
      });
  } // create

  public update(formData: NgForm) {
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
      "userId": USER_ID,
      "certificate_token": formData.value.certificate,
      "certificate_url": formData.value.upload,
      "certificate_category": formData.value.c_cat,
      "institution_name": formData.value.institution_name,
      "degree_name": formData.value.degree_name,
      "date_range": `${formData.value.dates}`,
      "description": formData.value.description,
      "index": parseInt(this.initialFormData?.index!),
      "timestamp": parseInt(this.initialFormData?.timestamp!),
      "previousHash": this.initialFormData?.previousHash,
      "hash": this.initialFormData?.hash,
      "blockType": this.initialFormData?.blockType,
      "createOriginHash": this.initialFormData?.createOriginHash
    };

    this.http.put('https://safe-demo-api.herokuapp.com/update', jsonData).subscribe(
      (s) => {
        // Makes the failed message display on the home screen
        this.formService.formState = CreateState.SUCCESS;

        // Go back to home screen
        this.router.navigate(['']);
      },
      (e) => {
        // Makes the failed message display on the home screen
        this.formService.formState = CreateState.FAILED;

        // Go back to home screen
        this.router.navigate(['']);
      });
  } // update

  public onBtnCancel() {
    // Makes the failed message display on the home screen
    this.formService.formState = CreateState.NOT_STARTED;

    // Go back to home screen
    this.router.navigate(['']);
  } // onBtnCancel
} // CreateComponent
