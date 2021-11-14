import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Block } from 'src/app/create/create.component';

@Component({
  selector: 'app-raw-block',
  templateUrl: './raw-block.component.html',
  styleUrls: ['./raw-block.component.scss']
})
export class RawBlockComponent implements OnInit {
  @Input() block: Block = {
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

  @Output() onBlockMined: EventEmitter<Block> = new EventEmitter<Block>();

  constructor() { } // Constructor

  ngOnInit(): void { } // ngOnInit

  onBtnMineClicked (b: Block) {
    this.onBlockMined.emit(b);
  } // onBtnMineClicked
} // RawBlockComponent
