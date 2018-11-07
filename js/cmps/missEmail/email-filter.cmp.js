

export default {
    template:`
    <section class="email-filter">
        <h3>Search</h3>
        <input type="text" v-model="filter.bySubject" @input="setFilter" />
    </section>
    `,
    data() {
        return {
            filter: {
                bySubject: ''
            }
        }
    },
    methods : {
        setFilter() {
            this.$emit('filtered', this.filter);
        }
    }
}