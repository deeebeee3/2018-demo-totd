 /* models/tags.js */
 const mongoose = require('mongoose')

 // Declare Schema
 const TagsSchema = new mongoose.Schema(
   {
     tag: { type: String },
     count: { type: Number }
   }
 );

 // Declare Model to mongoose with Schema
 const Tags = mongoose.model('Tags', TagSchema)

 // Export Model to be used in Node
 module.exports = mongoose.model('Tags')
