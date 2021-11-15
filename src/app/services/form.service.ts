import { Injectable } from '@angular/core';
import { CreateState } from '../create/create.component';
import { Block } from 'src/app/create/create.component';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  /**
   * Stores Form State making available to all components.
   * 
   * If CreateState is SUCCESS or FAIL, redirect
   * to the home page, showing a GREEN or RED banner.
   */
  public formState: CreateState = CreateState.NOT_STARTED;

  /**
   * Controls form action.
   * 
   * If null, form sends POST; if
   * an initial block, form sends PUT.
   */
  public initialBlock: Block | null = null;
  
  constructor() { } // constructor
} // FormService
