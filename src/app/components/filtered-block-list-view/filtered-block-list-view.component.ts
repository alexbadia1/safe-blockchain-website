import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Block } from 'src/app/create/create.component';

@Component({
  selector: 'app-filtered-block-list-view',
  templateUrl: './filtered-block-list-view.component.html',
  styleUrls: ['./filtered-block-list-view.component.scss']
})
export class FilteredBlockListViewComponent implements OnInit {
  public blocks: Array<Block> = [];

  constructor(
    private http: HttpClient,
  ) { } // constructor

  ngOnInit(): void {
     // Fetch Raw Blockchain on load
     this.http.get("https://safe-demo-api.herokuapp.com/chain", { params: { userId: "1"}, observe: 'body', responseType: 'json' }).subscribe(
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

  onReloadListView(deletedBlock: Block) {
    this.blocks = this.blocks.filter(currBlock => currBlock.hash !== deletedBlock.hash);
  } // onReloadListView
} // FilteredBlockListViewComponent
