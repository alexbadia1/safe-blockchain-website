import { Injectable } from '@angular/core';
import { CreateState } from '../create/create.component';
import { Block } from 'src/app/create/create.component';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  // If CreateState is SUCCESS or FAIL, redirect
  // to the home page, showing a GREEN or RED banner.
  public formState: CreateState = CreateState.NOT_STARTED;

  // Form Action
  public initialBlock: Block | null = null;
  
  constructor() { } // constructor
} // FormService
