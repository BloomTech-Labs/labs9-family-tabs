import React from 'react'

export default function AddEvent(props) {

    return (
      <form onSubmit={props.addEventHandler}>
        <input 
        type="text"
        name="title"
        onChange={props.inputHandler}
        placeholder="Event Title"
        value={props.title}>
        </input>

        <input 
        type="text"
        name="dateStart"
        onChange={props.inputHandler}
        placeholder="Event Start"
        value={props.dateStart}>
        </input>

        <input 
        type="text"
        name="dateEnd"
        onChange={props.inputHandler}
        placeholder="Event End"
        value={props.dateEnd}>
        </input>

        
        <input 
        type="text"
        name="phone"
        onChange={props.inputHandler}
        placeholder="Phone Number"
        value={props.phone}>
        </input>

        <textarea 
        type="text"
        name="body"
        onChange={props.inputHandler}
        placeholder="Note"
        value={props.body}>
        </textarea>

        <button>Add Event</button>
      </form>
    )
}
