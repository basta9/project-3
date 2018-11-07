'use strict';

const textBox = {
    props: ['data'],
    template: `
        <div class="input-text">
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

//DO
const todos = {
    props: ['data'],
    template: `
        <div class="input-todo">
            <label>
                {{data.label}}
                <input type="text" v-model="todo"/>
                <span @click="setToDo">+</span>
            </label>
        </div>
    `,
    data() {
        return {
            todo: '',
        }
    },
    methods: {
        setToDo() {
            this.$emit('addToDo', this.todo);
            this.todo = '';
        }
    }
}

export default {
    textBox,
    color,
    img,
    todos
}