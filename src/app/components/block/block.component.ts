import { Component, Input, OnInit } from '@angular/core';
import { Block } from 'src/app/create/create.component';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
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
    userId: ""
  } // Block;

  constructor() { } // Constructor

  ngOnInit(): void { } // ngOnInit

} // BlockComponent
