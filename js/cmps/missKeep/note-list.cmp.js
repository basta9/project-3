'use strict';
import notePreview from './note-preview.cmp.js';

export default {
    template: `
      <section class="notes-list-container">
            <ul class="notes-list">
                <note-preview></note-preview>
            </ul>
      </section>
    `,
    components: {
        notePreview
    }
}