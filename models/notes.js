 /* models/notes.js */
 const mongoose = require('mongoose')

 // Declare Schema
 const NotesSchema = new mongoose.Schema(
   {
     title: { type: String },
     details: { type: String },
     tags: {type: String}
   },
   { timestamps: true }
 );

 // Declare Model to mongoose with Schema
 const Notes = mongoose.model('Notes', NotesSchema)

 // Export Model to be used in Node
 module.exports = mongoose.model('Notes')
