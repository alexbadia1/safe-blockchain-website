import { Injectable } from '@angular/core';
import { Block } from '../create/create.component';
import * as CryptoJS from 'crypto-js';
import { Subject } from 'rxjs';
import { MINE_ZEROS } from '../app.component';

export const PEER_A = "Peer A";
export const PEER_B = "Peer B";
export const PEER_C = "Peer C";

@Injectable({
  providedIn: 'root'
})
export class PeerListViewServiceService {
  /**
   * Main user's blockchain passed from the Home Component,
   * which serves as a template for peers in the Decurity Demo.
   */
  public rawBlockchain: Array<Block> = [];

  /**
   * Stores the state of the Mine button. 
   * 
   * When clicked, all buttons are temporarly deactivated. 
   * The user can only mine one block at a a time in an effort
   * to avoid event queue scheduling and/or concurrency problems.
   */
  public canMine$: Subject<boolean> = new Subject();

  /**
   * Map to store all demo peer blockchains.
   */
  public peers: Map<string, Array<Block>> = new Map([
    [PEER_A, []],
    [PEER_B, []],
    [PEER_C, []],
  ]);

  constructor() { } // constructor

  /**
   * Recalculates the hashes for all the blocks in the chain starting
   * from the specified start index [start] to the end of the blockchain.
   * 
   * Start should be >= 1, as not to re-hash the genesis block.
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

      // SHA 256 Hash in this order excactly, as this is how it is
      // done server side too! See server side documentation for the hash.
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
      b.hash = CryptoJS.SHA256(msg).toString();
      prev = b;
    } // for
  } // hashBlockchain

  /**
   * Validates that all blocks on the chain are mined.
   * That is, each block's hash starts with five 0's.
   * 
   * @param peerKey string, the peer blockchain.
   * @returns boolean, valid chain or not.
   */
  public validChain(peerKey: string) {
    for (let block of this.peers.get(peerKey)!) {
      if (block.hash.substring(0, 5) != MINE_ZEROS) {
        return false;
      } // if
    } // for

    return true;
  } // validChain

  /**
   * Forms a consensus between all peers, by checking
   * which last blocks hash appears in most of the peers.
   * 
   * @returns string describing the consensus.
   */
  public consensus(): string {
    // All chains must be valid to form a consensus
    for (let key of this.peers.keys()) {
      if (!this.validChain(key)) {
        return "All chains must be valid to form a consensus!";
      } // if
    } // for

    // Frequency Table
    let freq: Map<string, number> = new Map();

    // For each chain...
    for (let key of this.peers.keys()) {

      // Get last block...
      let block = this.peers.get(key)![this.peers.get(key)!.length - 1];

      // Keep track in frequency table
      if (freq.get(block.hash) == undefined) {
        freq.set(block.hash, 1);
      } else {
        let newCount: number = freq.get(block.hash)! + 1;
        freq.set(block.hash, newCount);
      } // if-else
    } // for

    // Find Hash with max consensus from frequency table
    let max: number = 0;
    let maxHash: string = "";
    for (let fKey of freq.keys()) {
      if (freq.get(fKey)! > max) {
        max = freq.get(fKey)!
        maxHash = fKey;
      } // if
    } // for

    // For each chain...
    let correctPeers: Array<string> = [];
    for (let peer of this.peers.keys()) {

      // Get last block...
      let block = this.peers.get(peer)![this.peers.get(peer)!.length - 1];

      // Thix blockchain is part of the consensus.
      if (block.hash == maxHash) {
        correctPeers.push(peer);
      } // if
    } // for
    return `Consensus: ${correctPeers} (Votes: ${max})`;
  } // consensus
} // PeerListViewServiceService
