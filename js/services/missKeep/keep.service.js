import { utilService } from "../util.service.js";
import { storageService } from "../storage.service.js";
const NOTES_KEY = 'notes';

function query() {
    return storageService.load(NOTES_KEY)
        .then(notes => {
            // debugger
            if (!notes) {
                notes = _createNotes();
                storageService.store(NOTES_KEY, notes);
            }
            return notes;
        });
}

function _createNotes() {
    return [
        {
            id: utilService.makeId(),
            text: { input: 'hello', fontSize: '25px' },
            bgColor: '#232323',
            img: '',
            todos: {},
            audio: '',
            map: ''
        },
        {
            id: utilService.makeId(),
            text: { input: 'bye', fontSize: '25px' },
            bgColor: '#232323',
            img: '',
            todos: {},
            audio: '',
            map: ''
        },
        {
            id: utilService.makeId(),
            text: { input: 'cookie', fontSize: '25px' },
            bgColor: '#232323',
            img: '',
            todos: {},
            audio: '',
            map: ''
        },
    ];
}

function save(note) {
    console.log('new note created');

    storageService.load(NOTES_KEY)
        .then(notes => {
            notes.push(note);
            return storageService.store(NOTES_KEY, notes);
        });
}


function getNoteById(noteId) {
    return storageService.load(NOTES_KEY)
        .then(notes => {
            return notes.find(note => note.id === noteId);
        });
}

function deleteNote(emailId) {
    return storageService.load(NOTES_KEY)
        .then(notes => {
            var noteId = notes.find(note => note.id === noteId);
            notes.splice(noteId, 1);
            return storageService.store(NOTES_KEY, notes);
        });
}

export default {
    query,
    save,
    getNoteById,
    deleteNote
}
