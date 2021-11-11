import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Block } from 'src/app/create/create.component';

@Component({
  selector: 'app-raw-block-list-view',
  templateUrl: './raw-block-list-view.component.html',
  styleUrls: ['./raw-block-list-view.component.scss']
})
export class RawBlockListViewComponent implements OnInit {
  public blocks: Array<Block> = [];
  
  constructor(
    private http: HttpClient,
  ) { } // constructor

  ngOnInit(): void {
    // Fetch Raw Blockchain on load
    this.http.get("https://safe-demo-api.herokuapp.com/chain", { params: { userId: "1", view: "raw"}, observe: 'body', responseType: 'json' }).subscribe(
      (res) => {
        let jsonString: string = JSON.stringify(res);
        let jsonObj = JSON.parse(jsonString);

        try {
          // Reset current blocks list
          this.blocks = [];

          // Try to parse the JSON file into objects
          let i: number = 0;
          let block: Block | undefined | null = undefined;
          do {
            block = <Block>jsonObj[i++];
            
            if (block != undefined && block != null) {
              this.blocks.push(block);
            } // if
          } while (block != undefined && block != null);
        } // try
        catch (error) { } // catch
      },
      (error) => {
        // No blocks returned
        alert(`GET Request Failed: ${error}`);
        this.blocks = [];
      });
  } // ngOnInit

  onReloadListView() {

  } // onReloadListView
} // RawBlockListViewComponent