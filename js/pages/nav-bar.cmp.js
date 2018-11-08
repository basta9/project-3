

export default {
  template: `
      <nav class="nav-bar" @click="toggleMenu">
      <router-link class="nav-item" exact to="/">Home</router-link>
      <router-link class="nav-item" to="/emailApp">Email App</router-link>
      <router-link class="nav-item" to="/keepApp">Keep App</router-link>
      <router-link class="nav-item" to="/">About</router-link>
  </nav>
  `,
  methods: {
    toggleMenu(ev) {
      if (ev) {
        ev.stopPropagation();
      }
      document.body.classList.toggle('open');
    }

  }
}