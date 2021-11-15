import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Block } from '../create/create.component';

@Injectable({
  providedIn: 'root'
})
export class RawBlockListViewService {
  /**
   * Subject allows Raw List View Component to react
   * to any updates or deletes to the raw blockchain.
   */
  public onNewRawBlock$: Subject<Block> = new Subject<Block>();

  constructor() { } // constructor

  /**
   * Notifies the List View Component with new block.
   * @param newBlock Block, to be added to Raw List View Component.
   */
  public newRawBlock(newBlock: Block) {
    this.onNewRawBlock$.next(newBlock);
  } // newRawBlock
} // RawBlockListViewService
