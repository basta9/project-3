
import noteEdit from './note-edit.cmp.js';
import notePreview from './note-preview.cmp.js';
import noteList from './note-list.cmp.js';
import keepService from '../../services/missKeep/keep.service.js';

export default {
  template: `
    <section class="notes-container">
      <note-edit @newNote="setList"></note-edit>
      <note-list :notes="notesToShow"></note-list>
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
  },
  methods: {
    setList(note) {
      keepService.save(note);
      this.notes.push(note);
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