import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios';

const Pdfgen = () => {

  const host = 'http://localhost:5000'

  const style = '<style> @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"); *{font-family: "Roboto", sans-serif;} p {margin: 0; font-weight:normal; font-size: 13px} strong {font-size:15px; font-weight: 600; font-weight:bold;} tr, td, table, tbody {border: none} div.wrapper {padding-top: 20px; padding-left: 40px; padding-right: 30px; }  </style> '

  const [data, setData] = useState("");
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");


  useEffect(() => {
    console.log(data)
  }, [data])

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
  };

  const generatePdf = () => {
    console.log(data);
    axios.post(`${host}/generate-pdf`, {data})
    .then(res => {
        console.log(res.data)
    })
  }

  const addToData = (string) => {
    setData(`${data} ${string}`);
  };
  return (
    <div style={{ display: "flex", justifyContent: 'space-around'}}>
      <div
        style={{
          width: '635px',
          background: "#fff",
          padding: "10px",
          boxSizing: "border-box",
          borderRadius: "10px",
        }}
      >
        <Editor
          onEditorChange={(e) => {
            setData(`${style} ${e}`);
          }}
          value={data}
          init={{
            height: 842,
            menubar: false,
            plugins: "table code advtable lists fullscreen hr",
            toolbar:
              "undo redo | formatselect | bold italic hr | " +
              "alignleft aligncenter alignright alignjustify | indent outdent | " +
              "table tableinsertdialog tablecellprops tableprops advtablerownumbering | fullscreen",

            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; margin: 10px } p {margin: 0}",
          }}
        />
        <input
          type={"text"}
          placeholder="name of tamplete"
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn" onClick={addTemplate}>
          Add Template
        </button>

        <button className="btn" onClick={generatePdf}>generate pdf</button>
      </div>




      <div>
        <div
          style={{
            height: "862px",
            background: "#fff",
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{ width: "595px" }}
            className="special"
            dangerouslySetInnerHTML={{ __html: data }}
          />
        </div>
        <div className="tapletes">
          {items.map((item) => (
            <div className="item" onClick={() => addToData(item.tamplete)}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pdfgen;
