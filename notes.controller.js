const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  //   const notes = require('./db.json');
  //   const notes = Buffer.from(buffer).toString('utf-8');
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen('Note was added!'));
}

async function removeNote(id) {
  const notes = await getNotes();
  const updateNotes = notes.filter((note) => note.id !== id.toString());
  await fs.writeFile(notesPath, JSON.stringify(updateNotes));
  console.log(chalk.bgGreen(`Note with id ${id} was removed`));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue('Here is the list of notes:'));
  notes.forEach((note) => console.log(chalk.blue(note.id, note.title)));
}

async function updateNotes(id, newTitle) {
  const notes = await getNotes();
  const currentNote = notes.filter((note) => note.id === id.toString());
  const [currentNoteoBj] = currentNote;
  currentNoteoBj.title = newTitle;
  await fs.writeFile(notesPath, JSON.stringify([...notes, currentNoteoBj]));
  console.log(
    chalk.bgGreen(`Note with id ${id} was changed title to ${newTitle}`)
  );
}

module.exports = {
  addNote,
  removeNote,
  printNotes,
  getNotes,
  updateNotes,
};
