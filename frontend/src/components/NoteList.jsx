import React from 'react';
import Note from './Note';
import 'bulma/css/bulma.css';

const NoteList = ({ notes, onDelete, onEdit }) => (
    <div className="container note-list">
        {notes.map((note) => <Note
            key={note._id}
            id={note._id}
            note={note}
            onDelete={() => onDelete(note._id)}
            onEdit={() => onEdit(note)} />)}
        <div className="white">
            Total: {notes.length}
        </div>
    </div>
)

export default NoteList;
