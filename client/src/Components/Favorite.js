import React from 'react'
import {useState} from 'react'
import FaveNote from './FaveNote'




function Favorite({f, handleDeleteItem, setFavorites, favorites}) {
   console.log(f)
    const [note, setNote] = useState([])

    function handleChange(e){
     setNote(e.target.value)
    }
    
   function handleNote(e){
    e.preventDefault()
  
    const formInput = {
        note: note,
        book: f.book
    }
  
      // setFavorites(formInput,...favorites)
      fetch(`/favorite_books/${f.book.id}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify(formInput)
         
      })
      .then(r=>r.json())
      .then(data=>{
        console.log(data)
        setNote(note)
       
      })
    }
  const [read, setMarkasRead] = useState(true)
 
  function handleMarkAsRead(){
    setMarkasRead((read)=>!read)
  }

 
  return (
    <div className='.container-1'> 
        
        <p className=".container-1 p"
        //  className='favelist'
         >
         <h3 className='box-1'>{f.book.title} </h3> 
        <button className='box-2' onClick={handleMarkAsRead}> {read ?  "Mark as read" : "Mark as unread"} </button> 
        <h1> </h1>
        <h3> {f.note} </h3> 
        {/* <textarea rows={3} onChange={handleChange}> "leave your thoughts on this title" </textarea> */}
        {/* <button > </button>  */}
        <FaveNote 
        // setFavorites={setFavorites} 
        // note={note} 
         handleChange={handleChange} handleNote={handleNote}></FaveNote>
        {/* <button  className="remove" onClick={handleDeleteItem}> Delete title</button> */}
        </p>
      
    
  </div>
  )
}

export default Favorite