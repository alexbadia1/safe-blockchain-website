import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Block } from '../create/create.component';

@Injectable({
  providedIn: 'root'
})
export class RawBlockListViewService {
  public onNewRawBlock$: Subject<Block> = new Subject<Block>();

  constructor() { } // constructor

  /**
   * Adds a new block to the raw list view
   */
  public newRawBlock(newBlock: Block) {
    this.onNewRawBlock$.next(newBlock);
  } // newRawBlock
} // RawBlockListViewService
