import TrieSearch from "trie-search";
// import { englishWords } from "../data/english-words";
import { engFreqW20k } from "../data/eglishFreq.js";
// import { engFreqW20k } from "../data/engFreq200k.js";
// var TrieSearch = require("axios");

export const trie = new TrieSearch();
export const keyNumMap = {
  KeyQ: 1,
  KeyW: 2,
  KeyE: 3,
  KeyR: 4,
  KeyT: 5,
  KeyY: 6,
  KeyU: 7,
  KeyI: 8,
  KeyO: 9,
  KeyP: 0,
  // BracketLeft: 12,
  // KeyC
  // KeyV
  // KeyB
  // KeyN
  // KeyM
  // Comma
};

function EnglishWToTrie() {
  for (let i = 0; i < engFreqW20k.length - 1; i++) {
    let wordToNum = "";
    for (let e = 0; e < engFreqW20k[i][0].length; e++) {
      wordToNum = wordToNum + letttersToNum[engFreqW20k[i][0][e]];
    }
    trie.map(wordToNum, engFreqW20k[i]) + " " + wordToNum;
  }
  console.log(trie);
}

setTimeout(() => EnglishWToTrie(), 1000);
let letttersToNum = {
  ///ToDo IMPORTANT '- and similar characters should be translated to numbers?
  a: "1",
  b: "1",
  c: "2",
  d: "2",
  e: "3",
  f: "3",
  g: "4",
  h: "4",
  i: "5",
  j: "5",
  k: "6",
  l: "6",
  m: "6",
  n: "7",
  o: "7",
  p: "7",
  q: "8",
  r: "8",
  s: "8",
  t: "9",
  u: "9",
  v: "9",
  w: "0",
  x: "0",
  y: "0",
  z: "0",
  // 1: "1",
  // 2: "2",
  // 3: "3",
  // 4: "4",
  // 5: "5",
  // 6: "6",
  // 7: "7",
  // 8: "8",
  // 9: "9",
  // 0: "0",
  "'": "1",
  "-": "1",
  " ": " ",
  "\n": " ",
};
