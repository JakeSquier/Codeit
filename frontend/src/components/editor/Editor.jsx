import React, { useState, useEffect } from 'react'
import './editor.css'

import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/html'
import 'brace/mode/css'
import 'brace/mode/javascript'

import 'brace/theme/monokai'

function Editor(props) {

    return (
        <div>
            <div className="editor-title">
                {props.displayName}
                <button>
                    O/C
                </button>
            </div>
            <div className='code-container'>
                <AceEditor
                    className='editor'
                    mode={props.language}
                    theme="monokai"
                    height='340px'
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{
                        $blockScrolling: true
                    }}
                />
            </div>
        </div>
    )
}

export default Editor