import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    textHistory.push(text);
    updateTextHistory(textHistory);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase!", "success");
  };

  const handleLoClick = () => {
    textHistory.push(text);
    updateTextHistory(textHistory);
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase!", "success");
  };

  // toggle case: prabhat7k
  const toggleCase = () => {
    textHistory.push(text);
    updateTextHistory(textHistory);
    let str = text.split("");
    for (let i = 0; i < str.length; i++) {
      if (str[i] >= "A" && str[i] <= "Z")
        str[i] = String.fromCharCode(
          str[i].charCodeAt(0) + "a".charCodeAt(0) - "A".charCodeAt(0)
        );
      else if (str[i] >= "a" && str[i] <= "z")
        str[i] = String.fromCharCode(
          str[i].charCodeAt(0) + "A".charCodeAt(0) - "a".charCodeAt(0)
        );
    }
    let newText = str.join("");
    // console.log(newText);
    setText(newText);
    props.showAlert("Text Cases Toggled!", "success");
  };

  const handleClearClick = () => {
    textHistory.push(text);
    updateTextHistory(textHistory);
    let newText = "";
    setText(newText);
    props.showAlert("Text Cleared!", "success");
  };

  const handlePunctuation = () => {
    textHistory.push(text);
    updateTextHistory(textHistory);
    let newText = text.replace(/[.,\/#!?$%\^\*;:{}=\-_`~()]/g, "");
    setText(newText.replace(/\s{2,}/g, " "));
    props.showAlert("Punctuation Removed!", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleReplaceTextOnChange = (event) => {
    setReplaceObj({ ...replaceObj, replaceText: event.target.value });
  };

  const handleWithTextOnChange = (event) => {
    setReplaceObj({ ...replaceObj, withText: event.target.value });
  };

  const handleFindReplace = () => {
    setFindAndReplace(true);
  };

  const handleReplaceClick = () => {
    textHistory.push(text);
    updateTextHistory(textHistory);
    let newText = text.replaceAll(replaceObj.replaceText, replaceObj.withText);
    setText(newText);
    setFindAndReplace(false);
  };

  // Credits: A
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to Clipboard!", "success");
  };

  // Credits: Coding Wala
  const handleExtraSpaces = () => {
    textHistory.push(text);
    updateTextHistory(textHistory);
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra spaces removed!", "success");
  };

  // Credits: A
  const handlePaste = () => {
    textHistory.push(text);
    updateTextHistory(textHistory);
    setTimeout(async () => {
      const text = await navigator.clipboard.readText();
      setText(text);
    }, 2000);
    props.showAlert("Text Pasted from Clipboard", "success");
  };

  //added by- codewithnick
  const captializeFirstWord = () => {
    textHistory.push(text);
    updateTextHistory(textHistory);
    //split sentence into words
    // const arr = text.split(/[.\" "\n_]/);
    const arr = text.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      //capitalise first char of every word
    }
    //rejoin words
    const newText = arr.join(" ");

    // check for new line
    const arr2 = newText.split("\n");
    console.log("array2", arr2);
    for (var i = 0; i < arr2.length; i++) {
      arr2[i] = arr2[i].charAt(0).toUpperCase() + arr2[i].slice(1);
      //capitalise first char of every word
    }
    const newText2 = arr2.join("\n");

    // check for punctuation
    const arr3 = newText2.split(".");
    for (var i = 0; i < arr3.length; i++) {
      arr3[i] = arr3[i].charAt(0).toUpperCase() + arr3[i].slice(1);
      //capitalise first char of every word
    }
    const newText3 = arr3.join(".");

    setText(newText3);
    props.showAlert("Capitalised first word!", "success");
  };

  const readTxt = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setText(reader.result);
    };
    reader.onerror = () => {
      console.log("file error", reader.error);
    };
  };

  const addLineBreak = () => {
    textHistory.push(text);
    updateTextHistory(textHistory);
    //replace with line breaks
    let newText = text
      .replaceAll("?", "?\n")
      .replaceAll("!", "!\n")
      .replaceAll(".", ".\n");
    setText(newText);
    props.showAlert("Added Line breaks!", "success");
  };

  const removeLineBreak = () => {
    textHistory.push(text);
    updateTextHistory(textHistory);
    //replace with line breaks
    let newText = text.replaceAll("\n", " ");
    setText(newText);
    props.showAlert("Removed Line breaks!", "success");
  };
  const downloadFile = () => {
    //downloading file as txt
    //filename: myFile.txt
    let filename = "myFile.txt";
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  };

  const handleSentenceCase = () => {
    textHistory.push(text);
    updateTextHistory(textHistory);
    let newText = text.split(/[ ]+/),
      str = "";

    // first remove extra spaces and then capitalize first letter of every new sentence
    newText = newText.join(" ");

    // capitalize first letter of first sentence
    str = newText.charAt(0).toUpperCase();

    // to capitalize first letter of rest of sentences
    for (let i = 1; i < newText.length; i++) {
      if (i > 1 && newText[i - 2] === "." && newText[i - 1] === " ") {
        str += newText.charAt(i).toUpperCase();
      } else if (newText[i - 1] === "\n") {
        str += newText.charAt(i).toUpperCase();
      } else {
        str += newText.charAt(i);
      }
    }
    setText(str);
    props.showAlert("Capitalised first word of every sentence!", "success");
  };
  const reverseText = () => {
    textHistory.push(text);
    updateTextHistory(textHistory);
    // reversing the string
    let newText = text.split("").reverse().join("");
    setText(newText);
    props.showAlert("Reversed the text!", "success");
  };

  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };

  const handleUndoText = () => {
    const lastText = textHistory[textHistory.length - 1];
    textHistory.pop();
    updateTextHistory(textHistory);
    setText(lastText);
    props.showAlert("Successfully recovered your last text!", "success");
  };

  const [textHistory, updateTextHistory] = useState([]);
  const [text, setText] = useState("");
  const [findAndReplace, setFindAndReplace] = useState(false);
  const [replaceObj, setReplaceObj] = useState({
    replaceText: "",
    withText: "",
  });

  // text = "new text"; // Wrong way to change the state
  // setText("new text"); // Correct way to change the state
  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h1 className="mb-4">{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className={`custom-textarea ${
              props.mode === "dark"
                ? "custom-textare__dark"
                : "custom-textarea__light"
            }`}
            value={text}
            onChange={handleOnChange}
            placeholder="Enter your story here...."
            // style={{
            //   backgroundColor: props.mode === "dark" ? "#13466e" : "white",
            //   color: props.mode === "dark" ? "white" : "#042743",
            // }}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button
          disabled={text.length === 0}
          className="custom-button mx-1 my-1"
          onClick={handleUpClick}
        >
          Convert to Uppercase
        </button>
        <button
          disabled={text.length === 0}
          className="custom-button mx-1 my-1"
          onClick={handleLoClick}
        >
          Convert to Lowercase
        </button>
        <button
          disabled={text.length === 0}
          className="custom-button mx-1 my-1"
          onClick={handleClearClick}
        >
          Clear Text
        </button>
        <button
          disabled={text.length === 0}
          className="custom-button mx-1 my-1"
          onClick={handleCopy}
        >
          Copy Text
        </button>
        <button className="custom-button mx-1 my-1" onClick={handlePaste}>
          Paste Text
        </button>
        <button
          disabled={text.length === 0}
          className="custom-button mx-1 my-1"
          onClick={handleExtraSpaces}
        >
          Remove Extra Spaces
        </button>
        <button
          disabled={text.length === 0}
          className="custom-button mx-1 my-1"
          onClick={handleFindReplace}
        >
          Find and Replace
        </button>
        <button
          disabled={text.length === 0}
          className="custom-button mx-1 my-1"
          onClick={captializeFirstWord}
        >
          Captialize First Word
        </button>
        <button
          disabled={text.length === 0}
          className="custom-button mx-1 my-1"
          onClick={addLineBreak}
        >
          Add Line Break
        </button>
        <button
          disabled={text.length === 0}
          className="custom-button mx-1 my-1"
          onClick={removeLineBreak}
        >
          Remove Line Break
        </button>
        <button
          disabled={text.length === 0}
          className="custom-button mx-1 my-1"
          onClick={downloadFile}
        >
          Download file
        </button>
        <button
          disabled={text.length === 0}
          className="custom-button mx-1 my-1"
          onClick={handlePunctuation}
        >
          Remove Punctuation
        </button>
        <button
          disabled={text.length === 0}
          className="custom-button mx-1 my-1"
          onClick={handleSentenceCase}
        >
          Sentence Case
        </button>
        <button
          disabled={text.length === 0}
          className="custom-button mx-2 my-2"
          type="submit"
          onClick={speak}
        >
          Speak
        </button>
        <button
          disabled={text.length === 0}
          className="custom-button mx-1 my-1"
          onClick={reverseText}
        >
          Reverse Text
        </button>
        <input
          type="file"
          id="file-selector"
          className="custom-button  mx-2 my-2"
          onChange={readTxt}
        />
        <button
          disabled={text.length === 0}
          className="custom-button mx-1 my-1"
          onClick={toggleCase}
        >
          Toggle Case
        </button>
        <button
          disabled={textHistory.length === 0}
          className="custom-button mx-1 my-1"
          type="submit"
          onClick={handleUndoText}
        >
          Undo Text
        </button>

        {findAndReplace && (
          <div style={{ display: "flex", width: "200px", flexWrap: "wrap" }}>
            <input
              type="text"
              onChange={handleReplaceTextOnChange}
              className="form-control my-1"
              placeholder="Word in paragraph"
            />
            <input
              type="text"
              onChange={handleWithTextOnChange}
              className="form-control my-1"
              placeholder="Replace word with"
            />
            <button
              className="custom-button mx-1 mb-1 margin-top"
              onClick={handleReplaceClick}
            >
              Replace Instance
            </button>
          </div>
        )}
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h2>Your text summary</h2>
        <p>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          words and {text.length} characters
        </p>
        <p>
          {0.008 *
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          Minutes read
        </p>
        <h2>Preview</h2>
        <div
          className={`preview ${
            props.mode === "dark" ? "preview__dark" : "preview__light"
          }`}
        >
          {text.length > 0 ? text : "Nothing to preview!"}
        </div>
      </div>
    </>
  );
}
