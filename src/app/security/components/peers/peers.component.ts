import { Component, Input, OnInit } from '@angular/core';
import { Block } from 'src/app/create/create.component';
import { PeerListViewServiceService } from 'src/app/services/peer-list-view-service.service';

@Component({
  selector: 'app-peers',
  templateUrl: './peers.component.html',
  styleUrls: ['./peers.component.scss']
})
export class PeersComponent implements OnInit {
  public peerA: string = "Peer A";
  public peerB: string = "Peer B";
  public peerC: string = "Peer C";
  private userBlockchain: Array<Block> = [];

  constructor(
    private peerListViewService: PeerListViewServiceService
  ) { 
    // Get blockchain from service
    this.userBlockchain = this.peerListViewService.rawBlockchain;

    // Use dummy data, if user blockchain is null
    if (this.userBlockchain.length == 0) {
      this.loadDummyDataSet(this.peerA);
      this.loadDummyDataSet(this.peerB);
      this.loadDummyDataSet(this.peerC);
    } //  if
    else {
      this.loadRealDataSet(this.peerA);
      this.loadRealDataSet(this.peerB);
      this.loadRealDataSet(this.peerC);
    } // else
  } // constructor

  ngOnInit(): void { } // ngonInit

  private loadRealDataSet(peer: string) {
    let tmpBlockchain: Array<Block> = [];

    for (let bloc of this.userBlockchain) {
      tmpBlockchain.push(bloc);
    } // for

    this.peerListViewService.peers.set(peer, tmpBlockchain);
  } // loadRealDataSet

  private loadDummyDataSet(peer: string) {
    let blockchain: Array<Block> = [];

    // Genesis Block
    blockchain.push(
      {
        certificate_category: "",
        certificate_token: "",
        certificate_url: "",
        date_range: "",
        degree_name: "",
        description: "",
        hash: "0000010a65a5d687bf1b408e1ea3478bbac7f4af7bebcad8aae11909caf67965",
        index: "0",
        institution_name: "",
        previousHash: "0000010a65a5d687bf1b408e1ea3478bbac7f4af7bebcad8aae11909caf67965",
        timestamp: "1636895590",
        userId: "",
        blockType: "Genesis",
        createOriginHash: "",
        nonce: "1857386"
      },
    );

    // Create
    blockchain.push(
      {
        certificate_category: "Education",
        certificate_token: "ddd77eb1-27a1-493d-85de-bf494fb4267a",
        certificate_url: "https://www.credly.com/badges/ddd77eb1-27a1-493d-85de-bf494fb4267a?source=linked_in_profile",
        date_range: "October 2021",
        degree_name: "Google Data Analytics Professional Certificate",
        description: "Learned BigQueary, R, Tableau, Data Narratives/Presentation, Data Life Cycle, etc.",
        hash: "000003e879f3b217c599c56c302db2a5e2397183c96c9ffc7f9e41a60087e1aa",
        index: "1",
        institution_name: "Coursera",
        previousHash: "0000010a65a5d687bf1b408e1ea3478bbac7f4af7bebcad8aae11909caf67965",
        timestamp: "1636895592",
        userId: "3",
        blockType: "Genesis",
        createOriginHash: "000003e879f3b217c599c56c302db2a5e2397183c96c9ffc7f9e41a60087e1aa",
        nonce: "1092604"
      },
    );

    // Update
    blockchain.push(
      {
        userId: "3",
        certificate_token: "ddd77eb1-27a1-493d-85de-bf494fb4267a",
        certificate_url: "https://www.credly.com/badges/ddd77eb1-27a1-493d-85de-bf494fb4267a?source=linked_in_profile",
        certificate_category: "Education",
        institution_name: "FullStack Academy",
        degree_name: "Google Data Analytics Professional Certificate",
        date_range: "October 2021",
        description: "Learned SQL and NoSQL",
        index: "2",
        timestamp: "1636895707",
        previousHash: "000003e879f3b217c599c56c302db2a5e2397183c96c9ffc7f9e41a60087e1aa",
        hash: "000002f7c1d1f43c25b883a43bda5ae00e82a5243f85b29933d195b2b09eaf1f",
        blockType: "Update",
        createOriginHash: "000003e879f3b217c599c56c302db2a5e2397183c96c9ffc7f9e41a60087e1aa",
        nonce: "906780"
      }
    );

    // Delete
    blockchain.push(
      {
        userId: "3",
        certificate_token: "ddd77eb1-27a1-493d-85de-bf494fb4267a",
        certificate_url: "https://www.credly.com/badges/ddd77eb1-27a1-493d-85de-bf494fb4267a?source=linked_in_profile",
        certificate_category: "Education",
        institution_name: "FullStack Academy",
        degree_name: "Google Data Analytics Professional Certificate",
        date_range: "October 2021",
        description: "Learned SQL and NoSQL",
        index: "3",
        timestamp: "1636895883",
        previousHash: "000002f7c1d1f43c25b883a43bda5ae00e82a5243f85b29933d195b2b09eaf1f",
        hash: "00000681a102f493f160b05c84f28c1901241851e38045c25480211e20c513bb",
        blockType: "Delete",
        createOriginHash: "000003e879f3b217c599c56c302db2a5e2397183c96c9ffc7f9e41a60087e1aa",
        nonce: "1777267"
      }
    );

    // Create 
    blockchain.push(
      {
        userId: "3",
        certificate_token: "123456789987654321",
        certificate_url: "n/a",
        certificate_category: "Education",
        institution_name: "Marist",
        degree_name: "Cybersecurity",
        date_range: "May 2022",
        description: "I learned a lot!",
        index: "4",
        timestamp: "1636896075",
        previousHash: "00000681a102f493f160b05c84f28c1901241851e38045c25480211e20c513bb",
        hash: "00000cbf3fa8eeb2224f8822ca91cea4f84bb534e0c5fa00d77d92b8a9cd6ddb",
        blockType: "Create",
        createOriginHash: "00000cbf3fa8eeb2224f8822ca91cea4f84bb534e0c5fa00d77d92b8a9cd6ddb",
        nonce: "19792"
      }
    );
    console.log(blockchain);
    this.peerListViewService.peers.set(peer, blockchain);
  } // dummyDataSet

} // PeersComponent
