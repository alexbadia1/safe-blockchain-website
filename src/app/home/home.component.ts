import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateState } from '../create/create.component';
import { FormService } from '../services/form.service';
import { PeerListViewServiceService } from '../services/peer-list-view-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public formState: CreateState = CreateState.NOT_STARTED;

  constructor(
    private router: Router,
    private formService: FormService,
  ) { } // constructor

  // Make /chain API call
  public ngOnInit(): void {
    // Set state of the hidden message
    this.formState = this.formService.formState;
  } // ngOnInit

  public onBtnAddNew() {
    // Reset form success/failure banner
    this.resetFormState();
    
    // Use an empty form
    this.formService.initialBlock = null;

    // Go to the form
    this.router.navigate(['create']);
  } // onBtnAddNew

  public resetFormState() {
    this.formService.formState = CreateState.NOT_STARTED;
    this.formState = this.formService.formState;
  } // resetFormState
} // HomeComponent
