import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PDFViewer from 'pdf-viewer-reactjs'

import { Worker } from '@react-pdf-viewer/core';
import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css'




var specialChars = [
  { text: '@img', value:  '<img src="data:image/png;base64,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" />' },

];
const style1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
  wr: {
    width: '600px',
    padding: '10px',
    background: '#fff'
  },

};


const Pdfgen = () => {

  const host = 'http://localhost:5000'

  const style = `<style> @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"); *{font-family: "Roboto", sans-serif;} p {margin: 0; font-weight:normal; font-size: 13px} strong {font-size:15px; font-weight: 600; font-weight:bold;} tr, td, table, tbody {border: 1px solid #eee;} div.wrapper {padding-top: 20px; padding-left: 40px; padding-right: 30px; }  </style> `

  const [data, setData] = useState("");
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [path, setPath] = useState('')
  const [margins, setMargins] = useState({
    top: 0,
    right: 20,
    bottom: 0,
    left: 0
  })
  const [styles, setStyles] = useState("@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'); body { font-family: 'Roboto', sans-serif; font-size:14px; margin: 10px } p {margin: 0}")
  const ref = useRef()
  const onMarginChange = (key, value) => {
    switch (key) {
      case 'top':
        setMargins({...margins, top: value})
        break;

      case 'right':
        setMargins({...margins, right: value})
        setStyles(`@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'); body { font-family: 'Roboto', sans-serif; font-size:14px; padding:${value}px } p {margin: 0}`)
        break;

      case 'bottom':
        setMargins({...margins, bottom: value})
        break;

      case 'left':
        setMargins({...margins, left: value})
        break;
    
      default:
        break;
    }
  }
  


  useEffect(() => {
    console.log(data)
  }, [data])
  useEffect(() => {
  
   const data = JSON.parse( localStorage.getItem('items'))
   if(data) {
    setItems(data)
   }
  }, [])
  useEffect(() => {
    localStorage.setItem('items', `${JSON.stringify(items)}`);
  }, [items])


  const addTemplate = () => {
    setItems((prev) => [
      ...prev,
      {
        name,
        tamplete: data,
      },
    ]);
    setName("");
    setData("");
    console.log(items);

  };

  const generatePdf = () => {
    console.log(data);
  
    axios.post(`${host}/generate-pdf`, {data})
    .then(res => {
        console.log(res.data)
        setPath(res.data)
    })
  }

  const addToData = (string) => {
    setData(`${data} ${string}`);
  };
  return (
    <div style={{ display: "flex", justifyContent: 'space-around'}}>
      <div
        style={{
          width: '794px',
          background: "#fff",
          padding: "10px",
          boxSizing: "border-box",
          borderRadius: "10px",
        }}
      >
        <Editor
          ref={ref}
          onEditorChange={(e) => {
            setData(e);
          }}
          value={data}
          init={{
            setup: editor => {
            console.log(editor)
            var onAction = function (autocompleteApi, rng, value) {
            editor.selection.setRng(rng);
            editor.insertContent(value);
            autocompleteApi.hide();
            }
            var getMatchedChars = function (pattern) {
              return specialChars.filter(function (char) {
                return char.text.indexOf(pattern) !== -1;
              });
            };
            editor.ui.registry.addAutocompleter('specialchars', {
            ch: '@',
            minChars: 1,
            columns: 1,
            onAction: onAction,
            fetch: function (pattern) {
              return new Promise(function (resolve) {
                var results = getMatchedChars(pattern).map(function (char) {
                  return {
                    type: 'autocompleteitem',
                    direction: 'vertical',
                    align: 'right',
                    valign: 'middle',
                    value: char.value,
                    text: char.text,
                  }
                });
                console.log(results)
                resolve(results);
              });
            }
            });
           },
            menubar: false,
            plugins: "table code advtable lists fullscreen hr autoresize ",
            toolbar:
              "bold italic hr  forecolor backcolor| " +
              "alignleft aligncenter alignright alignjustify | indent outdent | " +
              "table tableinsertdialog tablecellprops tableprops advtablerownumbering ",

            content_style: styles
          }}
        />
       <div style={{marginTop: '20px'}}>
       <TextField
       variant="standard"
       sx={{marginRight: '10px'}}
          type={"text"}
          placeholder="name of tamplete"
          onChange={(e) => setName(e.target.value)}
        />
        <Button  variant="contained" sx={{marginRight: '10px'}} className="btn" onClick={addTemplate}>
          Add Template
        </Button>
        <Button onClick={handleOpen} sx={{marginRight: '10px'}}  variant="contained">
            prewiv
        </Button>

        <Button sx={{marginRight: '10px'}} variant="contained" className="btn" onClick={generatePdf}>generate pdf</Button>
       </div>

      </div>




      <div>
        <div
         style={{width: '300px'}}
        >
        </div>
        <div className="tapletes">
          {items.map((item) => (
            <Chip label={item.name}  onClick={() => addToData(item.tamplete)}/> 
          ))}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style1}>
      {/* <PDFViewer
      scale={0.7}
            document={{
                url: 'http://localhost:5000/pdf.pdf',
            }}
        /> */}
        
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
        <div
              style={{
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                  height: '550px',
                  width: '600px'
              }}
          >
              {path && <Viewer fileUrl={`http://localhost:5000/${path}`} defaultScale={SpecialZoomLevel.PageFit}/>}
          </div>
        </Worker>
       

      </Box>

      </Modal>
    </div>
  );
};

export default Pdfgen;
