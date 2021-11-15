import { Component, Input, OnInit } from '@angular/core';
import { MINE_ZEROS } from 'src/app/app.component';
import { Block } from 'src/app/create/create.component';
import { PeerListViewServiceService, PEER_A } from 'src/app/services/peer-list-view-service.service';
import { BlockchainKeyIndex } from '../peer-block/block.component';

export interface BlockIndexAndIsValid {
  index: number,
  isValid: boolean,
  canMine: boolean
} // BlockIndexAndIsValid

@Component({
  selector: 'app-peer-list-view',
  templateUrl: './peer-list-view.component.html',
  styleUrls: ['./peer-list-view.component.scss']
})
export class PeerListViewComponent implements OnInit {
  @Input() peerKey: string = PEER_A;
  public blockIndexes: Array<BlockIndexAndIsValid> = [];

  constructor(
    private peerListViewService: PeerListViewServiceService
  ) {
    // Peer
    let tmpArray: Array<Block> = this.peerListViewService.peers.get(this.peerKey) ?? [];
    let len: number = tmpArray.length ?? 0;
    for (let i: number = 0; i < len; ++i) {
      this.blockIndexes.push({ index: i, isValid: tmpArray[i].hash.substring(0, 5) == MINE_ZEROS, canMine: true})
    } // for
  } // constructor

  ngOnInit(): void {
    this.peerListViewService.canMine$.subscribe(
      canMine => {
        for (let index of this.blockIndexes) {
          index.canMine = canMine;
        } // if
      });
  } // ngOnInit

  public onFormChange(blockchainKeyIndex: BlockchainKeyIndex) {
    this.validateChain(blockchainKeyIndex);
  } // onFormChange

  private validateChain(blockchainKeyIndex: BlockchainKeyIndex) {
    let tmpArray: Array<Block> = this.peerListViewService.peers.get(blockchainKeyIndex.key) ?? [];
    let len: number = tmpArray.length ?? 0;

    // Check validity of blockchain
    for (let i: number = blockchainKeyIndex.index; i < len; ++i) {
      this.blockIndexes[i].isValid = tmpArray[i].hash.substring(0, 5) == MINE_ZEROS;
    } // for
  } // validateChain
} // PeerListViewComponent
