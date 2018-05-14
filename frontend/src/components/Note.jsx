import React from 'react';
import 'bulma/css/bulma.css';

const Note = ({ note, id, onDelete, onEdit }) => (
    <div className="box note-item level is-mobile">
        <div className="level-left">
            <span>{note.title}</span>
        </div>
        <div className="level-right">
            <a className="edit level-item" onClick={(e) => { e.preventDefault(); onEdit() }}>View</a>
            <a className="delete level-item" onClick={(e) => { e.preventDefault(); onDelete() }}>Delete</a>
        </div>
    </div>
)

export default Note;