'use strict';

const textBox = {
    props: ['data'],
    template: `
        <div class="txt-size">
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
        <div class="txt-color">
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

const pin = {
    props: ['data'],
    template: `
        <div class="input-pin">
            <label>
                {{data.label}}
                <input type="checkbox" v-model="isPined" @change="setPin"> 
                <span>📌</span> 
            </label>
        </div>
    `,
    data() {
        return {
            isPined: false
        }
    },
    methods: {
        setPin() {
            this.$emit('setPin', this.isPined);
            this.todo = '';
        }
    }
}

export default {
    textBox,
    color,
    img,
    todos,
    pin
}