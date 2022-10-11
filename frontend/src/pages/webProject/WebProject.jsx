import React, { useState, useEffect } from 'react';
import $ from "jquery";
import { AiFillHtml5 } from "react-icons/ai";
import { SiCss3 } from "react-icons/si";
import { DiJavascript } from "react-icons/di";
import { FaAlignLeft } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import './web.css'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/html'
import 'brace/mode/css'
import 'brace/mode/javascript'

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
import {twilight, monokai, cobalt, terminal, vibrant_ink, dracula, gruvbox, solarized_light, github, xcode} from '../scriptProject/theme'

function WebProject() {

    const [html, setHtml] = useState('')
    const [css, setCss] = useState('')
    const [js, setJs] = useState('')
    const [srcDoc, setSrcDoc] = useState('')
    const [theme, setTheme] = useState('twilight')
    const [show, setShow] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
          setSrcDoc(`
            <html>
              <body>${html}</body>
              <style>${css}</style>
              <script>${js}</script>
            </html>
          `)
        }, 250)
    
        return () => clearTimeout(timeout)
    }, [html, css, js])

    useEffect(() => {
        const modal = document.getElementById('webModal')

        if(show){
            modal.style.display = 'block'
        } else {
            modal.style.display = 'none'
        }

        // window.onclick = function(event) {
        //     if (event.target != modal && show) {
        //       remove modal when the area around it is clicked
        //     }
        // }
    }, [show])

    useEffect(() => {
        const headers = document.getElementsByClassName('editor-icon')
        const titles = document.getElementsByClassName('editor-title')
    
        let currTheme = theme === 'twilight' ? twilight : theme === 'monokai' ? monokai : theme === 'cobalt' ? cobalt : theme === 'terminal' ? terminal : theme === 'vibrant_ink' ? vibrant_ink : theme === 'dracula' ? dracula : theme === 'gruvbox' ? gruvbox : theme === 'solarized_light' ? solarized_light : github

        for(var i = 0; i < headers.length; i++){
            headers[i].style.background = currTheme

            if(currTheme == '#e8e8e8' || currTheme == '#fdf6e3'){
                titles[i].style.color = 'black'
            } else {
                titles[i].style.color = '#a0a4b1'
            }
        }

    }, [theme])
    
    const handleResize = (e) => {
        e.preventDefault();
        var dragging = true

        $(document).mousemove(function(e){

            if(e.pageY < 350) e.pageY = 350

            // if(e.pageY > window.innerHeight) e.pageY = window.innerHeight

            $('.input-container').css('height', `${e.pageY}`)

        });

        $(document).mouseup(function(e){
            if (dragging) 
            {
              $(document).unbind('mousemove');
              dragging = false;
            }
        });
    }

    const horizontalResizeOne = (e) => {
        e.preventDefault();
        var dragging = true

        $(document).mousemove(function(e){
            var direction = ''
            var x = window.scrollX + document.querySelector('#resizeOne').getBoundingClientRect().left
            var paneOne = $('paneOne')
            var paneTwo = $('#paneTwo')
            if(e.pageX < x) {
                $('#paneOne').css('width', `${e.pageX}`)
                var newWidth = (x - e.pageX) + document.getElementById('paneTwo').offsetWidth
                $('#paneTwo').css('width', `${newWidth}`)
            }
            if(e.pageX > x) {
                $('#paneTwo').css('width', `${e.pageX}`)
            }
        })

        $(document).mouseup(function(e){
            if (dragging) 
            {
              $(document).unbind('mousemove');
              dragging = false;
            }
        });
    }

    const horizontalResizeTwo = (e) => {
        e.preventDefault();
        var dragging = true

        $(document).mousemove(function(e){
            var direction = ''
            var x = window.scrollX + document.querySelector('#resizeOne').getBoundingClientRect().left
            var paneOne = $('paneOne')
            var paneTwo = $('#paneTwo')
            if(e.pageX < x) {
                $('#paneTwo').css('width', `${e.pageX}`)
                var newWidth = (x - e.pageX) + document.getElementById('paneTwo').offsetWidth
                $('#paneThree').css('width', `${newWidth}`)
            }
            if(e.pageX > x) {
                $('#paneTwo').css('width', `${e.pageX}`)
            }
        })

        $(document).mouseup(function(e){
            if (dragging) 
            {
              $(document).unbind('mousemove');
              dragging = false;
            }
        });
    }

    return (
        <div className='web-page-container'>
            <div className='web-modal' id='webModal'>
                <div className='web-modal-content'>
                    <h2 id='modalTitle'>Editor Settings</h2>
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
                    <button id='modalBtn' onClick={() => setShow(false)}>close</button>
                </div>
            </div>
            <div className="web-nav">
                <div className="web-left">
                    <h2>Project</h2>
                    <p>name</p>
                </div>
                <div className="web-right">
                    <button id="web-save-btn">Save</button>
                    <button id="web-profile-btn">img</button>
                </div>
            </div>
            <div className="editor-container">
                <div className="input-container">
                    <div className="editors" id='editors'>
                        <div className='resize-pane'></div>
                        <div id='paneOne'>
                            <div className='editor-header'>
                                <div className='editor-icon'>
                                    <AiFillHtml5 id='html' size={27}/>
                                    <h3 className='editor-title'>HTML</h3>
                                </div>
                                <div className='editor-options'>
                                    <button className='settings-web-btn' onClick={() => setShow(true)}>
                                        <IoIosSettings id='settings' size={22} />
                                    </button>
                                    <button className='format-web-btn'>
                                        <FaAlignLeft id='formatWeb' size={11}/>
                                    </button>
                                </div>
                            </div>
                            <div className='editor-content'>
                                <AceEditor
                                    className='editor'
                                    mode='html'
                                    theme={theme}
                                    height='100%'
                                    width='100%'
                                    name="UNIQUE_ID_OF_DIV"
                                    onChange={setHtml}
                                    setOptions={{
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: true
                                    }}        
                                />
                            </div>
                        </div>
                        <div className='resize-pane' id='resizeOne' onMouseDown={horizontalResizeOne}></div>
                        <div id='paneTwo'>
                            <div className='editor-header'>
                                <div className='editor-icon'>
                                    <SiCss3 id='css' size={22}/>
                                    <h3 className='editor-title'>CSS</h3>
                                </div>
                                <div className='editor-options'>
                                    <button className='settings-web-btn' onClick={() => setShow(true)}>
                                        <IoIosSettings id='settings' size={22} />
                                    </button>
                                    <button className='format-web-btn'>
                                        <FaAlignLeft id='formatWeb' size={11}/>
                                    </button>
                                </div>
                            </div>
                            <div className='editor-content'>
                                <AceEditor
                                    className='editor'
                                    mode='css'
                                    theme={theme}
                                    height='100%'
                                    width='100%'
                                    name="UNIQUE_ID_OF_DIV"
                                    onChange={setCss}
                                    setOptions={{
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: true
                                    }}        
                                />
                            </div>
                        </div>
                        <div className='resize-pane' id='resizeTwo' onMouseDown={horizontalResizeTwo}></div>
                        <div id='paneThree'>
                            <div className='editor-header'>
                                <div className='editor-icon'>
                                    <DiJavascript id='js' size={27}/>
                                    <h3 className='editor-title'>JS</h3>
                                </div>
                                <div className='editor-options'>
                                    <button className='settings-web-btn' onClick={() => setShow(true)}>
                                        <IoIosSettings id='settings' size={22} />
                                    </button>
                                    <button className='format-web-btn'>
                                        <FaAlignLeft id='formatWeb' size={11}/>
                                    </button>
                                </div>
                            </div>
                            <div className='editor-content'>
                                <AceEditor
                                    className='editor'
                                    mode='javascript'
                                    theme={theme}
                                    height='100%'
                                    width='100%'
                                    name="UNIQUE_ID_OF_DIV"
                                    onChange={setJs}
                                    setOptions={{
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: true
                                    }}        
                                />
                            </div>
                        </div>
                        <div className='resize-pane'></div>
                    </div>
                    <div className="editor-resize" onMouseDown={handleResize}></div>
                </div>
                <div className="output-container">
                    <iframe
                        srcDoc={srcDoc}
                        title="output"
                        sandbox="allow-scripts"
                        frameBorder="0"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
        </div>
    )
}

export default WebProject