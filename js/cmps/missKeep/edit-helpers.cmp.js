'use strict';

const textBox = {
    props: ['text'],
    template: `
                <textarea type="text" v-model="text" class="txt-input"
                @input="reportVal" placeholder="Note Text" rows="2" cols="20">
                </textarea>`,
    methods: {
        reportVal() {
            this.$emit('setInput', this.text)
        }
    }
}


const color = {
    template: `
        <div class="txt-color">
                <input type="color" title="Note Color" v-model="color" 
                @input="reportVal" />
                <span class="color-icon">🎨</span>
        </div>
    `,
    data() {
        return {
            color: '',
        }
    },
    methods: {
        reportVal() {
            this.$emit('setInput', this.color)
        }
    }
}


const img = {
    template: `
        <div class="input-img">
                    <span class="img-icon" title="Add Image" @click="isShown =!isShown">🖼️</span>
                    <div class="img-link" v-show="isShown">
                        <div @click="isShown = false">X</div>
                        <input type="text" v-model="link" placeholder="Img Link //http:"/>
                        <button type="button" @click="reportVal">Add</button>
                    </div>
        </div>
    `,
    data() {
        return {
            link: '',
            isShown: false
        }
    },
    methods: {
        reportVal() {
            this.$emit('setInput', this.link)
        },
    }
}


const todos = {
    template: `
                <span class="todo-icon" title="Add To-Do" @click="setToDo">✅</span>
            `,
    data() {
        return {
            todo: '',
            isShown: false
        }
    },
    methods: {
        setToDo() {
            this.$emit('setInput');
        }
    }
}

const pin = {
    template: `
            <span class="pin-icon" title="Pin Note" @click="setPin">📌</span> 
            `,
    data() {
        return {
            isPined: false
        }
    },
    methods: {
        setPin() {
            this.$emit('setPin');
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