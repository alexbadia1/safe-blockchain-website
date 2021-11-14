import { Injectable } from '@angular/core';
import { Block } from '../create/create.component';
import * as CryptoJS from 'crypto-js';
import { Subject } from 'rxjs';
import { MINE_ZEROS } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class PeerListViewServiceService {
  public rawBlockchain: Array<Block> = [];
  public canMine$: Subject<boolean> = new Subject();
  public peers: Map<string, Array<Block>> = new Map([
    ["Peer A", []],
    ["Peer B", []],
    ["Peer C", []],
  ]);

  constructor() { } // constructor

  /**
   * Recalculates the hashes for all the blocks in the chain starting
   * from the specified start index [start] to the end of the blockchain.
   * 
   * Start should be >= 1, as to not re-hash the genesis block.
   * 
   * @param peerKey string
   * @param start number
   * @returns void
   */
  public hashBlockchain(peerKey: string, start: number = 1): void {
    let blockchain: Array<Block> | undefined = this.peers.get(peerKey);

    if (blockchain == undefined) { return; } // if
    if (start == 0) { throw Error("Don't recalculated the Genesis Block!"); } // if

    // Hash all blocks on the chain
    //
    // First block is genesis block
    let prev: Block = blockchain[start - 1]!;
    let blockchainLength = blockchain.length;
    for (let i: number = start; i < blockchainLength; ++i) {
      // Get data included in hash, in this order:
      //  - hash
      //  - blockType
      //  - createOriginHash
      let b = blockchain[i];

      // Get prev hash before hashing
      b.previousHash = prev.hash;

      let msg: string = ""
      msg += `${b.certificate_category}`.trim();
      msg += `${b.certificate_token}`.trim();
      msg += `${b.certificate_url}`.trim();
      msg += `${b.date_range}`.trim();
      msg += `${b.degree_name}`.trim();
      msg += `${b.description}`.trim();
      msg += `${b.index}`.trim();
      msg += `${b.institution_name}`.trim();
      msg += `${b.previousHash}`.trim();
      msg += `${b.timestamp}`.trim();
      msg += `${b.userId}`.trim();
      msg += `${b.nonce}`.trim();

      // Store sha256 Hash
      b.hash = CryptoJS.SHA256(msg).toString();
      prev = b;
    } // for
  } // hashBlockchain

  public validChain(peerKey: string) {
    // Check validity of blockchain
    for (let block of this.peers.get(peerKey)!) {
      if (block.hash.substring(0, 5) != MINE_ZEROS) {
        return false;
      } // if
    } // for

    return true;
  } // validChain

  public consensus(): string {
    // Check for valid chains first
    // Check all the hash values
    for (let key of this.peers.keys()) {
      if (!this.validChain(key)) {
        return "Could not vote with invalid chains.";
      } // if
    } // for

    // Frequency Table
    let freq: Map<string, number> = new Map();

    // Check all the hash values
    for (let key of this.peers.keys()) {
      let block = this.peers.get(key)![this.peers.get(key)!.length - 1];

      // Put in hash table if it doesn't exist already
      // and count all frequency/occurences
      if (freq.get(block.hash) == undefined) {
        freq.set(block.hash, 1);
      } else {
        let newCount: number = freq.get(block.hash)! + 1;
        freq.set(block.hash, newCount);
      } // if-else
    } // for

    // Find Hash with max consensus
    let max: number = 0;
    let maxHash: string = "";
    for (let fKey of freq.keys()) {
      if (freq.get(fKey)! > max) {
        max = freq.get(fKey)!
        maxHash = fKey;
      } // if
    } // for
    console.log(freq);

    // Find Peer with the hash
    for (let peer of this.peers.keys()) {
      for (let block of this.peers.get(peer)!) {
        // Put in hash table if it doesn't exist already
        // and count all frequency/occurences
        if (block.hash == maxHash) {
          return `Consensus: ${peer} (Votes: ${max})`;
        } // if
      } // for
    } // for

    return "";
  } // vote
} // PeerListViewServiceService
