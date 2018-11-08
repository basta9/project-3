import { utilService } from "../util.service.js";
import { storageService } from "../storage.service.js";
const NOTES_KEY = 'notes';

function query() {
    return storageService.load(NOTES_KEY)
        .then(notes => {
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
            text: { input: 'Do today:', fontSize: '25px' },
            bgColor: '',
            img: '',
            todos: ['Do laundry', 'Learn Vue'],
            audio: '',
            map: ''
        },
        {
            id: utilService.makeId(),
            text: { input: '', fontSize: '25px' },
            bgColor: '',
            img: 'https://cdn.vox-cdn.com/thumbor/ZnP9cnjIn60slvybF_34lby1uMk=/0x0:2000x1125/1200x675/filters:focal(840x403:1160x723)/cdn.vox-cdn.com/uploads/chorus_image/image/58203557/171109_06_49_10_5DSR4201.0.jpg',
            todos: {},
            audio: '',
            map: ''
        },
        {
            id: utilService.makeId(),
            text: { input: 'Call Savta', fontSize: '25px' },
            bgColor: '',
            img: '',
            todos: {},
            audio: '',
            map: ''
        },
    ];
}

function save(note) {
    return storageService.load(NOTES_KEY)
        .then(notes => {
            // Edit
            if (note.id) {
                var noteIdx = notes.findIndex(currNote => currNote.id === note.id)
                notes.splice(noteIdx, 1, note);
            } else {
                // Add
                note.id = utilService.makeId();
                notes.push(note);
            }
            return storageService.store(NOTES_KEY, notes);
        });
}


function getNoteById(noteId) {
    return storageService.load(NOTES_KEY)
        .then(notes => {
            return notes.find(note => note.id === noteId);
        });
}

function deleteNote(noteId) {
    return storageService.load(NOTES_KEY)
        .then(notes => {
            var noteIdx = notes.findIndex(note => note.id === noteId);
            notes.splice(noteIdx, 1);
            return storageService.store(NOTES_KEY, notes);
        });
}

export default {
    query,
    save,
    getNoteById,
    deleteNote
}
