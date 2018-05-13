 /* models/notes.js */
 const mongoose = require('mongoose')

 // Declare Schema
 const NoteSchema = new mongoose.Schema(
   {
     title: { type: String },
     details: { type: String },
     tags: {type: String},
     done: { type: Boolean },
   },
   { timestamps: true }
 );

 // Declare Model to mongoose with Schema
 const Note = mongoose.model('Note', NoteSchema)

 // Export Model to be used in Node
 module.exports = mongoose.model('Note')
