import React, { useEffect, useRef, useState } from 'react'
import Pdfgen from './Pdfgen'

const App = () => {
  const [to, setTo] = useState('Vova')
  const [from, setFrom] = useState('Anthony')
  const [data, setData] = useState('30.08.2020')
  const [by, setBy] = useState('Katarina')
  const [id, setId] = useState(0)
  const [comment, setComment] = useState('')
  const [salary, setSalary] = useState(0)
  const [items, setItems] = useState([{
    id: 1,
    comment: 'just write something',
    salery: '500'
  }])

  const ref = useRef()
  useEffect(() => {
    console.log(ref.current);
  }, [ref])

  const add = () => {
    setItems(prev => [...prev, {
      id,
      comment,
      salery: salary
    }])
  }
  return (
    // <div className='main' >
    //   <div style={{display: 'flex', flexDirection: 'column'}}>
    //   <input placeholder='to' value={to} onChange={e => setTo(e.target.value)}/>
    //   <br />
    //   <input placeholder='from' value={from} onChange={e => setFrom(e.target.value)}/>
    //   <input placeholder='data' value={data} onChange={e => setData(e.target.value)}/>
    //   <br />
    //   <input placeholder='by' value={by} onChange={e => setBy(e.target.value)}/>
    //   <br />
    //   <br />
    //   <input placeholder='id' value={id} onChange={e => setId(e.target.value)}/>
    //   <input placeholder='comment' value={comment} onChange={e => setComment(e.target.value)}/>
    //   <input placeholder='salary' value={salary} onChange={e => setSalary(e.target.value)}/>
    //   <br />
    //   <button onClick={add}>add</button>
    //   </div>
      
    //   <div className='tamplete' style={{padding: '20px' , boxSizing: 'border-box', background: '#eee'}} ref={ref}>
    //    <h1 style={{"paddingBottom":"10px","borderBottom":"1px solid #909090"}}>Invocing</h1>
    //    <div style={{position: 'relative', width: '100%'}}> 
    //       <p style={{margin: '0'}}>to: {to}</p>
    //       <p style={{margin: '0'}}>from: {from}</p>
    //       <div style={{"position":"absolute","right":"0","top":"10px"}}>
    //         <p style={{margin: '0'}}>data: {data}</p>
    //         <p style={{margin: '0'}}>(c) {by}</p>
    //       </div>
    //       <table style={{"borderCollapse":"collapse","width":"100%","marginTop":"50px"}}>
    //       <tr>
    //         <th style={{"border":"1px solid #dddddd","textAlign":"left","padding":"8px"}}>id</th>
    //         <th style={{"border":"1px solid #dddddd","textAlign":"left","padding":"8px"}}>Comment</th>
    //         <th style={{"border":"1px solid #dddddd","textAlign":"left","padding":"8px"}}>Salary</th>
    //       </tr>
    //       {items.map((item, key) => {
    //         return (
    //           <tr>
    //             <td style={{"border":"1px solid #dddddd","textAlign":"left","padding":"8px"}}>{key}</td>
    //             <td style={{"border":"1px solid #dddddd","textAlign":"left","padding":"8px"}}>{item.comment}</td>
    //             <td style={{"border":"1px solid #dddddd","textAlign":"left","padding":"8px"}}>{item.salery}</td>
    //           </tr>
    //         )
    //       })}
    //       </table>
    //    </div>
    //   </div>
    // </div>
    <>
      <Pdfgen />
    </>
  )
}

export default App