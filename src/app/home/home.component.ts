import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CreateHTTPResponse } from '../create/create.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public blockchain: Array<CreateHTTPResponse> = [];
  constructor(
    private http: HttpClient,
  ) { } // constructor

  // Make /chain API call
  ngOnInit(): void {
    // this.http.get("https://safe-demo-api.herokuapp.com/create", { params: { userId: "2" } });
  } // ngOnInit

} // HomeComponent
