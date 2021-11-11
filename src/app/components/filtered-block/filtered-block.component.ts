import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Block } from 'src/app/create/create.component';

@Component({
  selector: 'app-filtered-block',
  templateUrl: './filtered-block.component.html',
  styleUrls: ['./filtered-block.component.scss']
})
export class FilteredBlockComponent implements OnInit {
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
    createOriginHash: ""
  } // Block

  @Output() reloadListView: EventEmitter<Block> = new EventEmitter<Block>();

  constructor(
    private http: HttpClient,
  ) { } // Constructor

  ngOnInit(): void { } // ngOnInit

  onBtnDeleteClick(block: Block) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: block
    };

    this.http.delete('https://safe-demo-api.herokuapp.com/delete', options).subscribe(
      (s) => {
        // Block successfully deleted!, remove it from the list-view!
        this.reloadListView.emit(block);
      },
      (e) => {
        console.log(`Delete Failed!`);
        console.log(e);
      });
  } // onBtnDeleteClick
} // FilteredBlockComponent
