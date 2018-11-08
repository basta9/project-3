'use strict';

export default {
    template: `
    <section class="notes-filter">
        <input type="text" v-model="filterKey" 
        @input="setFilter" placeholder="Search here..."/>
    </section>
  `,
    data() {
        return {
            filterKey: '',
        }
    },
    methods: {
        setFilter() {
            this.$emit('filtered', this.filterKey);
        }
    }

}

