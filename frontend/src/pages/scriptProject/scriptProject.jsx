import React, { useState, useEffect } from 'react';
import $ from "jquery";
import { AiFillHtml5 } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { FaAlignLeft } from "react-icons/fa";
import { FiTerminal } from "react-icons/fi";
import { DiJavascript } from "react-icons/di";
import './script.css'
import brace from 'brace'
import AceEditor from 'react-ace'
import axios from 'axios'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-min-noconflict/ext-language_tools";

import 'brace/theme/twilight'
import 'brace/theme/github'
import 'brace/theme/xcode'
import 'brace/theme/cobalt'
import 'brace/theme/monokai'
import 'brace/theme/terminal'
import 'brace/theme/vibrant_ink'
import 'brace/theme/dracula'
import 'brace/theme/gruvbox'
import 'brace/theme/chrome'
import 'brace/theme/solarized_light'
import 'brace/theme/tomorrow'
import {twilight, monokai, cobalt, terminal, vibrant_ink, dracula, gruvbox, solarized_light, github, xcode} from './theme'

import OutputWindow from './OutputWindow';

function ScriptProject() {

  const [script, setScript] = useState('')
  const [theme, setTheme] = useState('twilight')
  const [processing, setProcessing] = useState(false)
  const [customInput, setCustomInput] = useState('')
  const [outputDetails, setOutputDetails] = useState('')

  useEffect(() => {
    handleTheme()
  }, [theme])

  const handleTheme = (color) => {
    const header = document.getElementById('icon')
    const extras = document.getElementById('extras')
    const consoleHeader = document.getElementById('consoleIcon')
    const console = document.getElementById('console')
    const editorTitle = document.getElementById('editorTitle')
    const consoleTitle = document.getElementById('consoleTitle')

    let currTheme = theme === 'twilight' ? twilight : theme === 'monokai' ? monokai : theme === 'cobalt' ? cobalt : theme === 'terminal' ? terminal : theme === 'vibrant_ink' ? vibrant_ink : theme === 'dracula' ? dracula : theme === 'gruvbox' ? gruvbox : theme === 'solarized_light' ? solarized_light : github

    if(currTheme == '#e8e8e8' || currTheme == '#fdf6e3') {
      editorTitle.style.color = 'black'
      consoleTitle.style.color = 'black'
    } else {
      editorTitle.style.color = '#a0a4b1'
      consoleTitle.style.color = '#a0a4b1'
    }

    header.style.background = currTheme
    extras.style.background = currTheme
    consoleHeader.style.background = currTheme
    console.style.background = currTheme
  }

  const handleCompile = (e) => {
    setProcessing(true)

    const formData = {
      language_id: 63,
      source_code: btoa(script),
      stdin: btoa(customInput)
    }
    const options = {
      method: 'POST',
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    }

    axios.request(options)
    .then((response) => {
      console.log("res.data", response.data);
      const token = response.data.token;
      checkStatus(token);
    })
    .catch((err) => {
      let error = err.response ? err.response.data : err;
      setProcessing(false);
      console.log(error);
    })
  }

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else {
        setProcessing(false)
        setOutputDetails(response.data)
        console.log('response.data', response.data)
        return
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
    }
  };

  return (
    <div className='script-project-container'>
      <div className='script-nav'>
        <div className='script-left'>
          <h2>Project</h2>
          <p>name</p>
        </div>
        <div className='script-right'>
          <button id="web-save-btn">Save</button>
          <button id="web-profile-btn">img</button>
        </div>
      </div>
      <div className='script-content-container'>
        <div className='extras-pane' id='extras'>
          <div className='controls-container'>
            <div>
              <button className='execute-btn' onClick={handleCompile}>
                <BsFillPlayFill id='play' size={35}/> Run
              </button>
              <button className='format-btn'>
                <FaAlignLeft id='format' size={21}/>
              </button>
            </div>
            <select name='themes' id='theme' onChange={(e) => setTheme(e.target.value)}>
              <option value="twilight">Twilight</option>
              <option value="monokai">Monokai</option>
              <option value="cobalt">Cobalt</option>
              <option value="terminal">Terminal</option>
              <option value="vibrant_ink">Vibrant Ink</option>
              <option value="dracula">Dracula</option>
              <option value="gruvbox">Gruvbox</option>
              <option value="github">Github</option>
              <option value="xcode">XCode</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="chrome">Chrome</option>
              <option value="solarized_light">Solarized Light</option>
            </select>
          </div>
        </div>
        <div className='resize-bar'></div>
        <div className='script-pane'>
          <div className='script-header'>
            <div className='script-icon' id='icon'>
              <DiJavascript id='js' size={27}/>
              <h3 className='editor-title' id='editorTitle'>JS (es7+)</h3>
            </div>
          </div>
          <div className='script-content'>
            <AceEditor
              className='editor'
              mode='javascript'
              theme={theme}
              height='100%'
              width='100%'
              name="UNIQUE_ID_OF_DIV"
              onChange={setScript}
              showGutter={true}
              highlightActiveLine={true}
              editorProps={{$blockScrolling: Infinity}}
              enableBasicAutocompletion={true}
              enableLiveAutocompletion={true}
              enableSnippets={true}  
            />
          </div>
        </div>
        <div className='resize-bar'></div>
        <div className='console-pane'>
          <div className='output-header'>
            <div className='output-icon' id='consoleIcon'>
              <FiTerminal id='terminal' size={27}/>
              <h3 className='editor-title' id='consoleTitle'>Console</h3>
            </div>
          </div>
          <div className='console-container' id='console'>
            <OutputWindow outputDetails={outputDetails} processing={processing}/>
            {processing ? <div className='spinner'></div> : <></>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScriptProject