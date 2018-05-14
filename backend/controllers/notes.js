const Notes =  require('../models/notes');

async function findAll (ctx) {
  const notes = await Notes.find({});
  ctx.body = notes;
}

async function create (ctx) {
  const newNote = new Notes(ctx.request.body)
  const savedNote = await newNote.save();
  ctx.body = savedNote;
}

async function destroy (ctx) {
  const id = ctx.params.id;
  const note = await Notes.findById(id);

  const deletedNote = await note.remove()
  ctx.body = deletedNote;
}

async function update (ctx) {
  const id = ctx.params.id;
  const note = await Notes.findById(id);

  const { title, details, tags } = ctx.request.body;

  note.title = title;
  note.details = details;
  note.tags = tags;

  const updatedNote = await note.save();
  ctx.body = updatedNote;
}

module.exports = {
  findAll,
  create,
  destroy,
  update
}
