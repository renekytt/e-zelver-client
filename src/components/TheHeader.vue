<template>
  <nav class="navbar">
    <div class="logo">
      <div class="action-btn text" @click="home()"> E-Zelver
      </div>
    </div>

    <div class="item">
      <div class="group">
        <div class="detail">
          <button class="action-btn" v-if="isCustomer" @click="cart()">CART</button>
          <button class="action-btn" v-if="!isAuthenticated" @click="login()">SIGN IN</button>
          <button class="action-btn" v-if="isAuthenticated" @click="sign_out()">SIGN OUT</button>
        </div>
      </div>
    </div>

  </nav>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  methods: {
    login() {
      this.$router.push("login")
    },
    sign_out() {
      this.$store.dispatch('auth/logout')
    },
    home() {
      this.$router.push("/")
    },
    cart() {
      this.$router.push("cart")
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'isCustomer']),
  }
}
</script>

<style>
:root {
  --theme-bg-color: #fdca5c;
  --theme-color: rgb(0, 0, 0);
}

* {
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
  box-sizing: border-box;
}

.navbar {
  display: flex;
  box-shadow: 0 0 2px 0 grey;
  align-items: center;
  font-size: 1em;

  background-color: #3761af;
  background-color: var(--theme-bg-color);

  color: white;
  color: var(--theme-color);


}

.item {
  padding: 10px;
  text-decoration: none;
  color: white;
  color: var(--theme-color);

}

.item.right {
  margin: 0 0 0 auto;
}

.logo img {
  max-width: 40px;
}

.logo .text {
  margin-left: 20px;
  font-size: 30px;
  font-weight: 600;
}

.action-btn {
  margin-left: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>
