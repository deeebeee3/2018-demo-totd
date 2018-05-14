import React, { Component } from 'react';
import 'bulma/css/bulma.css';

const Note = ({ note, id, onDelete, onEdit }) => (
    <div className="box note-item level is-mobile">
        <div className="level-left">
            <span>{note.title}</span>
        </div>
        <div className="level-right">
            <a className="edit level-item" onClick={(e) => { e.preventDefault(); onEdit() }}>Edit</a>
            <a className="delete level-item" onClick={(e) => { e.preventDefault(); onDelete() }}>Delete</a>
        </div>
    </div>
)

function getNewNote() {
    return {
        title: '',
        details: '',
        tags: ''
    }
}

class Notes extends Component {
    state = {
        note: getNewNote(),
        notes: [],
        error: '',
        isLoading: false
    }

    componentDidMount() {
        this.fetchNotes()
    }

    fetchNotes() {
        this.setState({ isLoading: true })

        // HTTP GET Request to our backend api and load into state
        fetch('v1/notes')
            .then((res) => res.json())
            .then(notes => this.setState({ isLoading: false, notes }))
            .catch((error) => this.setState({ error: error.message }))
    }

    editNote(note) {
        this.setState({ note });
    } s

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

        }
    }

    async addNote(event) {
        event.preventDefault();
        const { note } = this.state

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

            this.setState({ note: getNewNote() });

            // refresh...
            this.fetchNotes();
        } catch (err) {

        }

    }

    updateNoteProperty(e, prop) {
        e.preventDefault();

        const note = {
            ...this.state.note,
            [prop]: e.target.value
        };

        this.setState({ note });
    }

    render() {
        let { notes, note, isLoading, error } = this.state

        const total = notes.length

        return (
            <div>
                <section className="section full-column">
                    <h1 className="title white">Notes</h1>
                    <div className="error">{error}</div>
                </section>

                <div className="columns">
                    <section className="section column">
                        <form className="form" onSubmit={this.addNote.bind(this)}>
                            <div className="field">
                                <label className="label">Title</label>
                                <div className="control">
                                    <input className="input"
                                        type="text"
                                        value={note.title}
                                        onChange={(e) => this.updateNoteProperty(e, 'title')}
                                        placeholder="Note Title" />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Note Text</label>
                                <div className="control">
                                    <textarea className="textarea"
                                        placeholder="Note Text"
                                        value={note.details}
                                        onChange={(e) => this.updateNoteProperty(e, 'details')} />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Tags (separate each tag with a comma)</label>
                                <div className="control">
                                    <input className="input"
                                        type="text"
                                        value={note.tags}
                                        placeholder="Tags"
                                        onChange={(e) => this.updateNoteProperty(e, 'tags')} />
                                </div>
                            </div>

                            <div className="control">
                                <button
                                    className={'button is-success ${isLoading && "is-loading"}'}
                                    disabled={isLoading}
                                    onClick={(e) => this.addNote(e)}>{note._id ? 'Update' : 'Add'}
                                </button>
                            </div>

                        </form>
                    </section>

                    <section className="section column">
                        <div className="container note-list">
                            {notes.map((note) => <Note
                                key={note._id}
                                id={note._id}
                                note={note}
                                onDelete={() => this.deleteNote(note._id)}
                                onEdit={() => this.editNote(note)} />)}
                            <div className="white">
                                Total: {total}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Notes;
