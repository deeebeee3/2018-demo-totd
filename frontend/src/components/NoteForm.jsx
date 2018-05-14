import React from 'react';
import 'bulma/css/bulma.css';

const NoteForm = ({ note, isDirty, isLoading, onUpdateProperty, onSave, onCancel }) => (
    <form className="form" onSubmit={onSave}>
        <div className="field">
            <label className="label">Title</label>
            <div className="control">
                <input className="input"
                    type="text"
                    value={note.title}
                    onChange={(e) => onUpdateProperty(e, 'title')}
                    placeholder="Note Title" />
            </div>
        </div>

        <div className="field">
            <label className="label">Note Text</label>
            <div className="control">
                <textarea className="textarea"
                    rows="15"
                    placeholder="Note Text"
                    value={note.details}
                    onChange={(e) => onUpdateProperty(e, 'details')} />
            </div>
        </div>

        <div className="field">
            <label className="label">Tags (separate each tag with a comma)</label>
            <div className="control">
                <input className="input"
                    type="text"
                    value={note.tags}
                    placeholder="Tags"
                    onChange={(e) => onUpdateProperty(e, 'tags')} />
            </div>
        </div>

        <div className="control">
            <button
                className={`button is-success ${isLoading && "is-loading"}`}
                disabled={isLoading}
                onClick={(e) => onSave(e)}>{note._id ? 'Update' : 'Add'}
            </button>
            {(isDirty || note._id) && <button
                className={`button is-success`}
                onClick={(e) => onCancel(e)}>Cancel
            </button>}

        </div>
    </form>
)

export default NoteForm;