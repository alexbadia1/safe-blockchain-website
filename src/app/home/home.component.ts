import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Block, BlockChain, CreateState } from '../create/create.component';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public blocks: Array<Block> = [];
  public formState: CreateState = CreateState.NOT_STARTED;

  constructor(
    private router: Router,
    private http: HttpClient,
    private formService: FormService,
  ) { } // constructor

  // Make /chain API call
  public ngOnInit(): void {
    // Set state of the hidden message
    this.formState = this.formService.formState;

    // Fetch Blockchain on load
    this.http.get("https://safe-demo-api.herokuapp.com/chain", { params: { userId: "1" }, observe: 'body', responseType: 'json' }).subscribe(
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

  public onBtnAddNew() {
    this.resetFormState();
    this.router.navigate(['create']);
  } // onBtnAddNew
  
  public resetFormState() {
    this.formService.formState = CreateState.NOT_STARTED;
    this.formState = this.formService.formState;
  } // resetFormState
} // HomeComponent
