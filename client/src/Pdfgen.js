import React, { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';


const Pdfgen = () => {
    const [data, setData] = useState('')
    const [items, setItems] = useState([])
    const [name, setName] = useState('')
    const addTemplate = () => {
        setItems(prev => [...prev, {
            name,
            tamplete: data
        }])
        setName('')
        setData('')
    }
    const addToData = (string) => {
        setData(`${data} ${string}`)
    }
  return (
    <div style={{display: 'flex', justifyContent: 'space-around'}}>
    <div style={{width: '550px', background: '#fff', padding: '10px', boxSizing: 'border-box', borderRadius: '10px'}}>
    <Editor
         onEditorChange={e => {setData(e)
         console.log(e)
         }}
         value={data}
         init={{
           height: 500,
           menubar: false,
           plugins: 'table code advtable lists fullscreen hr',
            toolbar: 'undo redo | formatselect | bold italic hr | ' +
                'alignleft aligncenter alignright alignjustify | indent outdent | ' +
                'table tableinsertdialog tablecellprops tableprops advtablerownumbering | fullscreen',
  
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;  } p {margin: 0}'
         }}
       />
        <input type={'text'} placeholder='name of tamplete' onChange={e => setName(e.target.value)}/>
       <button className='btn' onClick={addTemplate}>Add Template</button>
    </div>
        <div>
        <div style={{width: '475px', height: '500px', background: '#fff', padding: '10px', boxSizing: 'border-box',}}>
            <div style={{width: '475px'}} className='special' dangerouslySetInnerHTML={{__html: data}}/>
            
            </div>
            <div className='tapletes'>
                {items.map((item) => <div className='item' onClick={() => addToData(item.tamplete)}>{item.name}</div>)}
            </div>
        </div>
    </div>
  )
}

export default Pdfgen