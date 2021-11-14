import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-security-demo-button',
  templateUrl: './security-demo-button.component.html',
  styleUrls: ['./security-demo-button.component.scss']
})
export class SecurityDemoButtonComponent implements OnInit {

  constructor(
    private router: Router,
  ) { } // constructor

  ngOnInit(): void { } // ngOnInit

  public onBtnSecurityDemoClicked() { 
    // Go to the Security Demo Page
    this.router.navigate(['security-demo']);
  } // onBtnSecurityDemoClicked

} // SecurityDemoButtonComponent
