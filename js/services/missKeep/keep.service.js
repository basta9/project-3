import { utilService } from "../util.service.js";
import { storageService } from "../storage.service.js";
const NOTES_KEY = 'notes';

function query(filter = null) {
    console.log(filter);
    return storageService.load(NOTES_KEY)
        .then(notes => {
            // debugger
            if (!notes) {
                notes = _createNotes();
                storageService.store(NOTES_KEY, notes);
            }
            if (filter === null) return notes.filter(note => !note.isPined);
            else {
                return notes.filter(note => {
                    // debugger
                    if (note.isPined) return false;
                    let text = note.text.input.toLowerCase();
                    if (text.includes(filter)) return true;
                    if (note.todos[0]) {
                        if (note.todos.find(todo => {
                            let text = todo.text.toLowerCase();
                            if (text.includes(filter)) return true;
                        })) return true;
                    }
                    return false
                });
            }
        });

    var filteredNotes = this
}

function _createNotes() {
    return [
        {
            id: utilService.makeId(),
            isPined: false,
            text: { input: 'Do today:', fontSize: '25px' },
            bgColor: '',
            img: '',
            todos: [{ text: 'Do laundry', isDone: false }, { text: 'Learn Vue', isDone: false }],
            audio: '',
            map: ''
        },
        {
            id: utilService.makeId(),
            isPined: false,
            text: { input: '', fontSize: '25px' },
            bgColor: '',
            img: 'https://cdn.vox-cdn.com/thumbor/ZnP9cnjIn60slvybF_34lby1uMk=/0x0:2000x1125/1200x675/filters:focal(840x403:1160x723)/cdn.vox-cdn.com/uploads/chorus_image/image/58203557/171109_06_49_10_5DSR4201.0.jpg',
            todos: {},
            audio: '',
            map: ''
        },
        {
            id: utilService.makeId(),
            isPined: false,
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
    console.log('Note', note);

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

function updateTodo(noteId, todoIdx, isDone) {
    return storageService.load(NOTES_KEY)
        .then(notes => {
            notes = notes.map(note => {
                if (note.id === noteId) note.todos[todoIdx].isDone = isDone;
                return note;
            });
            storageService.store(NOTES_KEY, notes);
        });
}

function setPin(noteId, isPined) {
    return storageService.load(NOTES_KEY)
        .then(notes => {
            notes = notes.map(note => {
                if (note.id === noteId) note.isPined = isPined;
                return note;
            })
            storageService.store(NOTES_KEY, notes);
        })
}

function pinedNotes() {
    return storageService.load(NOTES_KEY)
        .then(notes => {
            // debugger
            if (!notes) {
                notes = _createNotes();
                storageService.store(NOTES_KEY, notes);
            }
            notes = notes.filter(note => note.isPined)
            console.log('pin service', notes);
            return notes;
        })
}


export default {
    query,
    save,
    getNoteById,
    deleteNote,
    updateTodo,
    setPin,
    pinedNotes
}
