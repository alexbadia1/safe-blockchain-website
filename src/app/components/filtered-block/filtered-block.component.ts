import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Block } from 'src/app/create/create.component';
import { RawBlockListViewService } from 'src/app/services/raw-block-list-view.service';

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

  private deletedBlocks: Array<Block> = [];

  @Output() reloadListView: EventEmitter<Block> = new EventEmitter<Block>();

  constructor(
    private http: HttpClient,
    private rawBlockListViewService: RawBlockListViewService
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
        // There should only be one JSON object returned, according to the custom API.
        // This is a "hack" and should be fixed, but I don't know how to parse JSON correctly.
        try {
          // Update raw list view
          this.rawBlockListViewService.newRawBlock(<Block>JSON.parse(JSON.stringify(s)));
        } // try
        catch (error) {
          console.log(`Failed to parse delete response JSON!`);
          console.log(Error);
        } // catch

        // Update filtered list view
        this.reloadListView.emit(block);
      },
      (e) => {
        console.log(`Delete Failed!`);
        console.log(e);
      });
  } // onBtnDeleteClick
} // FilteredBlockComponent
