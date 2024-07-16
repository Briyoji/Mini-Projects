import React, {useState} from "react";

export default function TextForm(props) {

  const [text, setText] = useState("");
  const [disableBtn, setdisableBtn] = useState("disabled")
  var numberOfWords = "0";

  const convertLower = () => {
    setText(text.toLowerCase());
  }
  const convertUpper = () => {
    setText(text.toUpperCase());
  }
  
  const copyText = () => {
    props.funcs.raiseAlert("success", "Text has been copied to clipboard!")
    navigator.clipboard.writeText(text)
  }

  const removeExtraSpaces = () => {
    setText(text.split(/[ ]+/).join(" ").trim())
  }

  const clearText = () => {
    props.funcs.raiseAlert("danger", "Text has been cleared!")
    setText("");
  }

  const handleOnChange = (event) => {
    setText(event.target.value);
    if (event.target.value !== "") {
      setdisableBtn("")
    } else {
      setdisableBtn("disabled")
    }
  }


  return (
    <div className="container my-5">
      <h1>Analyse Your Text</h1>
      <div className="mb-3 my-4">
        <textarea
          value={text}
          onChange={handleOnChange}
          placeholder="Enter text here..."
          className="form-control"
          id="inputTextArea"
          rows="15"
        ></textarea>
      </div>
      <div className="container action-btns">
        <button className={`action-btn btn method-btn ${disableBtn}`} onClick={convertUpper}>Convert to Uppercase</button>
        <button className={`action-btn btn method-btn ${disableBtn}`} onClick={convertLower}>Convert to Lowercase</button>
        <button className={`action-btn btn method-btn ${disableBtn}`} onClick={copyText}>Copy Text to Clipboard</button>
        <button className={`action-btn btn method-btn ${disableBtn}`} onClick={removeExtraSpaces}>Remove Extra Spaces</button>
        <button className={`action-btn btn btn-danger ${disableBtn}`} onClick={clearText}>Clear Text</button>
      </div>
      <div className="container my-4 text-summary">
        <h2>Text Summary</h2>
        <p>{numberOfWords = text.split(/\s/).filter(x => /^[^\s]+$/.test(x)).length} words and {text.length} characters <br /> Time to Read: {numberOfWords*0.48} sec</p>
      </div>
    </div>
  );
}
