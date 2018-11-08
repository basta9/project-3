

export default {
    template:`
    <section class="email-filter flex">
        <input type="text" v-model="filter.bySubject" @input="setFilter" placeholder="Search here..."/>
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
            this.$emit('filtered', {...this.filter});
        }
    }
}