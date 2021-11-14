import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-button',
  templateUrl: './home-button.component.html',
  styleUrls: ['./home-button.component.scss']
})
export class HomeButtonComponent implements OnInit {
  @Output() onPressed: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
  ) { } // constructor

  ngOnInit(): void { } // ngOnInit

  public onBtnHomeClicked() {
    // Let parents know I was pressed!
    this.onPressed.emit(1);

    // Go to the Security Demo Page
    this.router.navigate(['']);
  } // onBtnSecurityDemoClicked
} // HomeButtonComponent
