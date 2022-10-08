import React, {useState} from 'react'


export default function TextForm(props) {
    const handleUpClick = ()=>{
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to uppercase!", "success");
    }

    const handleLoClick = ()=>{ 
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase!", "success");
    }

    const handleClearClick = ()=>{ 
        let newText = '';
        setText(newText);
        props.showAlert("Text Cleared!", "success");
    }

    const handleOnChange = (event)=>{
        setText(event.target.value) 
    }

    const handleReplaceTextOnChange = (event) => {
        setReplaceObj(
            {...replaceObj , replaceText : event.target.value}
        )
    }
    
    const handleWithTextOnChange = (event) => {
        setReplaceObj(
            {...replaceObj , withText : event.target.value}
        )
    }

    const handleFindReplace = () => {
        setFindAndReplace(true);
    }
    
    const handleReplaceClick = () => {
        let newText = text.replaceAll(replaceObj.replaceText,replaceObj.withText);
        setText(newText);
        setFindAndReplace(false);
    }

    // Credits: A
    const handleCopy = () => {
        navigator.clipboard.writeText(text); 
        props.showAlert("Copied to Clipboard!", "success");
    }

    // Credits: Coding Wala
    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed!", "success");
    }

    //added by- codewithnick
    const captializeFirstWord = () => {
        //split sentence into words
        const arr = text.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            //capitalise first char of every word
        }
        //rejoin words
        const newText = arr.join(" ");
        setText(newText);
        props.showAlert("Capitalised first word!", "success");
    }

    const [text, setText] = useState(''); 
    const [findAndReplace, setFindAndReplace] = useState(false);
    const [replaceObj,setReplaceObj]=useState({replaceText:"",withText:""});

    // text = "new text"; // Wrong way to change the state
    // setText("new text"); // Correct way to change the state
    return (
        <>
        <div className="container" style={{color: props.mode==='dark'?'white':'#042743'}}> 
            <h1 className='mb-4'>{props.heading}</h1>
            <div className="mb-3"> 
            <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'#121212':'white', color: props.mode==='dark'?'white':'#042743'}} id="myBox" rows="8"></textarea>
            </div>
            <button disabled={text.length===0} className={`btn btn-${props.mode} mx-1 my-1`} onClick={handleUpClick}>Convert to Uppercase</button>
            <button disabled={text.length===0} className={`btn btn-${props.mode} mx-1 my-1`} onClick={handleLoClick}>Convert to Lowercase</button>
            <button disabled={text.length===0} className={`btn btn-${props.mode} mx-1 my-1`} onClick={handleClearClick}>Clear Text</button>
            <button disabled={text.length===0} className={`btn btn-${props.mode} mx-1 my-1`} onClick={handleCopy}>Copy Text</button>
            <button disabled={text.length===0} className={`btn btn-${props.mode} mx-1 my-1`} onClick={handleExtraSpaces}>Remove Extra Spaces</button>
            <button disabled={text.length===0} className={`btn btn-${props.mode} mx-1 my-1`} onClick={handleFindReplace}>Find and Replace</button>
            <button disabled={text.length===0} className={`btn btn-${props.mode} mx-1 my-1`} onClick={captializeFirstWord}>Captialize First Word</button>

            { findAndReplace && 
                <div style={{display : 'flex', width : '200px',flexWrap: 'wrap'}}>
                    <input type="text" onChange={handleReplaceTextOnChange} className="form-control my-1" placeholder='Word in paragraph'/>
                    <input type="text" onChange={handleWithTextOnChange} className="form-control my-1" placeholder='Replace word with'/>
                    <button className={`btn btn-${props.mode} mx-1 my-1 margin-top`} onClick={handleReplaceClick}>Replace Instance</button>
                </div>
            }
        </div>
        <div className="container my-3" style={{color: props.mode==='dark'?'white':'#042743'}}>
            <h2>Your text summary</h2>
            <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
            <p>{0.008 *  text.split(/\s+/).filter((element)=>{return element.length!==0}).length} Minutes read</p>
            <h2>Preview</h2>
            <p>{text.length>0?text:"Nothing to preview!"}</p>
        </div>
        </>
    )
}
