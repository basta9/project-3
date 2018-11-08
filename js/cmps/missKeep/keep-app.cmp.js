
import noteEdit from './note-edit.cmp.js';
import notePreview from './note-preview.cmp.js';
import noteList from './note-list.cmp.js';
import keepService from '../../services/missKeep/keep.service.js';
import eventBus, { DELETE_NOTE } from '../../event-bus.js';

export default {
  template: `
    <section class="notes-container">
      <router-link class="add-note" to="/keepApp/noteEdit">Add Note</router-link>
      <note-list :notes="notesToShow" @editNote="setEditor"></note-list>
    </section>
  `,
  data() {
    return {
      notes: null
    }
  },
  created() {
    keepService.query()
      .then(notes => this.notes = notes);

    eventBus.$on(DELETE_NOTE, id => {
      console.log('id', id);

      keepService.deleteNote(id)
        .then(() => {
          keepService.query()
            .then(notes => this.notes = notes);
        })
    })
  },
  mounted() {
    document.querySelector('body').style.backgroundImage = 'url(../../img/note-board.jpg)';
    document.querySelector('body').style.backgroundSize = 'cover';
    document.querySelector('body').style.width = '100%';
    document.querySelector('body').style.height = '100vh';
    document.querySelector('body').style.backgroundAttachment = 'fixed';
  },
  destroyed() {
    document.querySelector('body').style.backgroundImage = '';
    document.querySelector('body').style.backgroundSize = '';
    document.querySelector('body').style.width = '';
    document.querySelector('body').style.height = '';
    document.querySelector('body').style.backgroundAttachment = '';
  },
  methods: {
    setList(note) {
      keepService.save(note);
      this.notes.push(note);
    },
    setEditor(note) {
      console.log(note);

    }
  },
  computed: {
    notesToShow() {
      return this.notes;
    }
  },
  components: {
    noteEdit,
    notePreview,
    noteList
  }
}