
import noteEdit from './note-edit.cmp.js';
import notePreview from './note-preview.cmp.js';
import noteList from './note-list.cmp.js';

export default {
  template: `
    <section class="notes-container">
      <note-edit></note-edit>
      <note-preview></note-preview>
    </section>
  `,
  components: {
    noteEdit,
    notePreview,
    noteList
  }
}