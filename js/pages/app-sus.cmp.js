

export default {
    template: `
    <section class="home">
        <h1>Welcome To AppSus</h1>
        <img src="./img/Apsus.jpg"/>
        <div class="home-link-container">
            <router-link class="home-link" to="/emailApp">
                <h3>Send an Email</h3> <br>
                <img src="./img/home-email.png">
            </router-link>
            <router-link class="home-link" to="/keepApp">
                <h3>Keep Notes</h3><br>
                <img src="./img/note-home.png">
            </router-link>
        </div>
    </section> 
    `
}