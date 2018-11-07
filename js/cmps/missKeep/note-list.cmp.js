'use strict';
import notePreview from './note-preview.cmp.js';

export default {
    props: ['notes'],
    template: `
      <section class="notes-list-container">
            <ul class="notes-list">
                <note-preview v-for="note in notes" :note="note">
                    </note-preview>
            </ul>
      </section>
    `,
    components: {
        notePreview
    },
    methods: {
        editNote(note) {
            this.$emit('editNote', note);
        }
    }
}