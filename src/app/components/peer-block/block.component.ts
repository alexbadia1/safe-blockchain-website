import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Block, CreateHTTPResponse } from 'src/app/create/create.component';
import { PeerListViewServiceService } from 'src/app/services/peer-list-view-service.service';

export interface BlockchainKeyIndex {
  key: string;
  index: number;
} // BlockchainKeyPair

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  @Input() index: number = 0;
  @Input() peerKey: string = "";
  @Input() isValid: boolean = true;
  @Input() canMine: boolean = true;
  @Output() formChange: EventEmitter<BlockchainKeyIndex> = new EventEmitter();

  public block: Block = {
    certificate_category: "",
    certificate_token: "",
    certificate_url: "",
    date_range: "",
    degree_name: "",
    description: "",
    hash: "",
    index: "",
    institution_name: "",
    previousHash: "",
    timestamp: "",
    userId: "",
    blockType: "",
    createOriginHash: "",
    nonce: ""
  } // Block

  constructor(
    private http: HttpClient,
    private peerListViewService: PeerListViewServiceService
  ) { } // constructor

  ngOnInit(): void {
    this.updateBlock();
  } // ngOnInit

  public onFormChange(block: NgForm) {
    let updatedBlock: Block = {
      certificate_category: block.value.certificate_category,
      certificate_token: block.value.certificate_token,
      certificate_url: block.value.certificate_url,
      date_range: block.value.date_range,
      degree_name: block.value.degree_name,
      description: block.value.description,
      index: this.block.index,
      institution_name: block.value.institution_name,
      previousHash: this.block.previousHash,
      timestamp: block.value.timestamp,
      userId: block.value.userId,
      hash: this.block.hash,
      blockType: this.block.blockType,
      createOriginHash: this.block.createOriginHash,
      nonce: block.value.nonce
    } // updatedBlock

    // Update block in Service
    this.peerListViewService.peers.get(this.peerKey)![this.index] = updatedBlock;

    // Update local instance of block binded to view
    this.updateBlock();

    // Re-hash blockchain
    this.peerListViewService.hashBlockchain(this.peerKey, this.index);

    // Validate Blockchain
    this.formChange.emit({ key: this.peerKey, index: this.index });
  } // onFormChange

  public onMine(block: NgForm) {
    // Disable all mine buttons
    this.peerListViewService.canMine$.next(false);

    let jsonData = {
      "userId": block.value.userId,
      "certificate_token": block.value.certificate_token,
      "certificate_url": block.value.certificate_url,
      "certificate_category": block.value.certificate_category,
      "institution_name": block.value.institution_name,
      "degree_name": block.value.degree_name,
      "date_range": `${block.value.date_range}`,
      "description": block.value.description,
      "index": parseInt(this.block.index),
      "timestamp": parseInt(block.value.timestamp),
      "previousHash": this.block.previousHash,
      "hash": this.block.hash,
      "blockType": this.block.blockType,
      "createOriginHash": this.block.createOriginHash,
      "nonce": parseInt(block.value.nonce),
    };
    this.http.post<CreateHTTPResponse>("https://safe-demo-api.herokuapp.com/mine", JSON.stringify(jsonData)).subscribe(
      result => {

        // Update block in Service
        this.peerListViewService.peers.get(this.peerKey)![this.index] = <Block>JSON.parse(JSON.stringify(result));

        // Update local instance of block binded to view
        this.updateBlock();

        // Re-hash blockchain
        this.peerListViewService.hashBlockchain(this.peerKey, this.index);

        // Validate Blockchain
        this.formChange.emit({ key: this.peerKey, index: this.index });

        // Enable Mine Buttons
        this.peerListViewService.canMine$.next(true);
      },
      error => {
        alert(`Mine failed ${error}`);
        // Enable Mine Buttons
        this.peerListViewService.canMine$.next(true);
      });
  } // onMine

  private updateBlock() {
    let tmp: Array<Block> | undefined = this.peerListViewService.peers.get(this.peerKey);

    if (tmp != undefined) {
      this.block = tmp[this.index];
    } // if
  } // setBlock

} // BlockComponent
