'use strict';

const textBox = {
    props: ['data'],
    template: `
        <div class="row">
            <label>
                {{data.label}}
                <input type="text" v-model="txt" @input="reportVal" />
            </label>
        </div>
    `,
    data() {
        return {
            txt: '',
        }
    },
    methods: {
        reportVal() {
            this.$emit('setInput', this.txt)
        }
    }
}


const color = {
    props: ['data'],
    template: `
        <div class="row">
            <label>
                {{data.label}}
                <input type="color" v-model="color" @input="reportVal" />
            </label>
        </div>
    `,
    data() {
        return {
            color: 'black',
        }
    },
    methods: {
        reportVal() {
            this.$emit('setInput', this.txt)
        }
    }
}

//Do!
const img = {
    props: ['data'],
    template: `
        <div class="row">
            <label>
                {{data.label}}
                <input type="text" v-model="txt" @input="reportVal" />
            </label>
        </div>
    `,
    data() {
        return {
            txt: '',
        }
    },
    methods: {
        reportVal() {
            this.$emit('setInput', this.txt)
        }
    }
}

//DO
const todos = {
    props: ['data'],
    template: `
        <div class="row">
            <label>
                {{data.label}}
                <input type="text" v-model="txt" @input="reportVal" />
            </label>
        </div>
    `,
    data() {
        return {
            txt: '',
        }
    },
    methods: {
        reportVal() {
            this.$emit('setInput', this.txt)
        }
    }
}

export default {
    textBox,
    color,
    img,
    todos
}