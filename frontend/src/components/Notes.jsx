import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import NoteList from './NoteList';
import NoteForm from './NoteForm';

class Notes extends Component {
    state = {
        note: getNewNote(),
        notes: [],
        isLoading: false,
        message: '',
        isDirty: false
    }

    componentDidMount() {
        this.fetchNotes()
    }

    async fetchNotes() {
        this.setState({ isLoading: true })

        try {
            // HTTP GET Request to our backend api and load into state
            const res = await fetch('v1/notes')
            const notes = await res.json()

            this.setState({ isLoading: false, notes })
        } catch (err) {
            this.setState({ message: err.message })
        }
    }

    editNote(note) {
        this.setState({ note, isDirty: false });
    }

    discardEdit(e) {
        e.preventDefault();
        this.setState({ note: getNewNote(), isDirty: false });
    }

    async deleteNote(id) {

        if (this.state.note._id === id) {
            this.setState({ note: getNewNote() });
        }

        const url = `v1/notes/${id}`;

        try {
            const res = await fetch(url, {
                method: "DELETE",
            });

            console.log('success', res)

            // refresh...
            this.fetchNotes();
        } catch (err) {
            this.setState({ message: err.message })
        }
    }

    async saveNote(event) {
        event.preventDefault();
        const { note } = this.state

        if (!note.title) {
            this.setState({ message: 'Please enter a note title' });
            return;
        }

        const url = note._id ? `v1/notes/${note._id}` : `v1/notes`;

        try {
            const res = await fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(note)
            });

            console.log('success', res)

            this.setState({ note: getNewNote(), isDirty: false });

            // refresh...
            this.fetchNotes();
        } catch (err) {
            this.setState({ message: err.message })
        }
    }

    updateNoteProperty(e, prop) {
        e.preventDefault();

        const note = {
            ...this.state.note,
            [prop]: e.target.value
        };

        this.setState({ note, isDirty: true });
    }

    render() {
        const { notes, note, isLoading, message, isDirty } = this.state

        return (
            <div>
                <section className="section full-column">
                    <h1 className="title white">Notes</h1>
                    <div className="error">{message}</div>
                </section>

                <div className="columns">
                    <section className="section column">
                        <NoteForm
                            note={note}
                            isDirty={isDirty}
                            isLoading={isLoading}
                            onUpdateProperty={(e, prop) => this.updateNoteProperty(e, prop)}
                            onSave={(e) => this.saveNote(e)}
                            onCancel={(e) => this.discardEdit(e)}
                        />
                    </section>

                    <section className="section column">
                        <NoteList
                            notes={notes}
                            onDelete={(id) => this.deleteNote(id)}
                            onEdit={(note) => this.editNote(note)}
                        />
                    </section>
                </div>
            </div>
        );
    }
}

function getNewNote() {
    return {
        title: '',
        details: '',
        tags: ''
    }
}

export default Notes;
