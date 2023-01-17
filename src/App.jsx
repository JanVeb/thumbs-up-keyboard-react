import "./App.css";
import { useState } from "react";
import { keyNumMap, trie } from "./comp/Trie";
import { engFreqW20k } from "./data/eglishFreq.js";

let tuNum = "";

const is_key_down = (() => {
  const state = {};
  window.addEventListener("keyup", (e) => (state[e.code] = false));
  window.addEventListener("keydown", (e) => (state[e.code] = true));
  return (code) => (state.hasOwnProperty(code) && state[code]) || false;
})();

let displayListChange = 0;
var sortedArray = [];
document.onkeydown = function (e) {
  if (e.code === "KeyB") {
    if (displayListChange * 10 < sortedArray.length - 11) {
      displayListChange++;
      ChangeDisplayList();
      return;
    }
  } else {
    if (e.code === "KeyV") {
      if (displayListChange > 0) {
        displayListChange--;
        ChangeDisplayList();
        return;
      }
    }
  }
  displayListChange = 0;
  if (is_key_down("KeyC") && e.code !== "KeyC") {
    console.log("🚀 ~ file: App.jsx ~ line 36 ~ tuNum.length", tuNum.length);
    if (tuNum.length === 0) {
      let addWord = document.getElementById("tuText").innerHTML;
      document.getElementById("tuText").innerHTML = addWord + " ";
      return;
    }
    let addWord = document.getElementById("tuText").innerHTML;

    document.getElementById("tuText").innerHTML = addWord + sortedArray[0][0];
    // document.getElementById("tuText").innerHTML =
    //   document.getElementById("tuText").innerHTML;
    document.getElementById("workingWord").innerHTML = "";
    tuNum = "";
    GetSugPos();
    return;
  }

  if (e.code === "BracketLeft") {
    tuNum = tuNum.slice(0, tuNum.length - 1);
    SortByFreq(trie.search(tuNum));
    document.getElementById("tuNum").innerHTML = tuNum;
    trie.search(tuNum)[0]
      ? (document.getElementById("workingWord").innerHTML = sortedArray[0][0])
      : null;
    // DisplayFoundList(trie.search(tuNum));
    // SortByFreq(trie.search(tuNum));
  } else {
    if (keyNumMap[e.code] !== undefined) {
      tuNum = tuNum + keyNumMap[e.code];
      SortByFreq(trie.search(tuNum));
      trie.search(tuNum).length === 0
        ? (tuNum = tuNum.slice(0, tuNum.length - 1))
        : null;
      document.getElementById("tuNum").innerHTML = tuNum;
      trie.search(tuNum)[0]
        ? (document.getElementById("workingWord").innerHTML = sortedArray[0][0])
        : null;
      // DisplayFoundList(trie.search(tuNum));
      // SortByFreq(trie.search(tuNum));
    }
  }
  GetSugPos();
};

var sortedArray = [];
function SortByFreq(getRawList) {
  let freqList = [];
  let wordList = [];
  sortedArray = getRawList.sort(function (a, b) {
    return b[1] - a[1];
  });
  DisplayFoundList(sortedArray);
}

function ChangeDisplayList() {
  var ul = document.getElementById("list");
  ul.innerHTML = "";

  for (
    var i = 10 * displayListChange;
    i < sortedArray.length && i < 10 * displayListChange + 10;
    i++
  ) {
    var li = document.createElement("li");

    ul.appendChild(li);
    li.innerHTML = li.innerHTML + sortedArray[i][0];
  }
  document.getElementById("workingWord").innerHTML =
    sortedArray[10 * displayListChange][0];
}

// function ChangeDisplayListDown() {
//   var ul = document.getElementById("list");
//   ul.innerHTML = "";

//   for (
//     var i = 10 * displayListChange;
//     i < sortedArray.length && i < 10 * displayListChange + 10;
//     i++
//   ) {
//     var li = document.createElement("li");

//     ul.appendChild(li);
//     li.innerHTML = li.innerHTML + sortedArray[i][0];
//   }
//   document.getElementById("workingWord").innerHTML =
//     sortedArray[10 * displayListChange][0];
// }

function DisplayFoundList(getList) {
  var ul = document.getElementById("list");
  ul.innerHTML = "";

  for (var i = 0; i < getList.length && i < 10; i++) {
    var li = document.createElement("li");

    ul.appendChild(li);
    li.innerHTML = li.innerHTML + getList[i][0];
  }
}

function GetSugPos() {
  if (document.getElementById("workingWord")) {
    // setSugWin({
    // let testWidth = expression(document.getElementById("sugWin").style.width);
    if (
      document.getElementById("workingWord").getBoundingClientRect().left +
        document.getElementById("sugWin").getBoundingClientRect().width >
      window.innerWidth
    ) {
      document.getElementById("sugWin").style.left =
        window.innerWidth -
        document.getElementById("sugWin").getBoundingClientRect().width -
        25 +
        "px";
    } else {
      if (
        document.getElementById("workingWord").getBoundingClientRect().left -
          50 <
        50
      ) {
        document.getElementById("sugWin").style.left = 0 + "px";
      } else {
        document.getElementById("sugWin").style.left =
          document.getElementById("workingWord").getBoundingClientRect().left -
          50 +
          "px";
      }
    }
    document.getElementById("sugWin").style.top = document
      .getElementById("cursor")
      .getBoundingClientRect().top;
  }
}

function App() {
  return (
    <div className="App">
      <p id="tuNum"></p>
      <br></br>
      <br></br>

      <richtext id="tuText" style={{ right: 0 }}></richtext>
      {/* <div style={{ display: "flex" }} id="inLine"> */}
      <richtext id="workingWord"></richtext>
      <richtext id="cursor">|</richtext>
      {/* </div> */}
      <br></br>
      <div
        id="sugWin"
        style={{
          // border: "2px solid white",
          content: "",
          backgroundColor: "grey",
          position: "absolute",
          paddingRight: "10px",
          // left: "-250px",
          fontSize: "26px",
          width: "inherit",
          height: "inherit",
        }}
      >
        <ul id="list"></ul>
      </div>
    </div>
  );
}

export default App;
