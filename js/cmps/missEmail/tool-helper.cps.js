'use strict';

const textBox = {
    props: ['data'],
    template: `
        <div class="email-replay">
            <label>
                {{data.label}}
                <button @click="reportVal"></button>
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
        <div class="input-color">
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
            this.$emit('setInput', this.color)
        }
    }
}

//Do!
const img = {
    props: ['data'],
    template: `
        <div class="input-img">
            <label>
                {{data.label}}
                <input type="text" v-model="link" @input="reportVal" />
            </label>
        </div>
    `,
    data() {
        return {
            link: '',
        }
    },
    methods: {
        reportVal() {
            this.$emit('setInput', this.link)
        }
    }
}


export default {
    textBox,
    color,
}