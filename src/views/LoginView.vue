<template>
  <the-header class="shadow-sm"></the-header>
  <div class="container">
    <div class="layout-login">
      <div class="card">
        <div class="card-header">Login</div>
        <form @submit.prevent="loginUser">
          <label for="email">Email</label>
          <div class="card-text">
            <input type="email" id="email" v-model="form.email" required/>
          </div>

          <label for="pass">Password</label>
          <div class="card-text">
            <input type="password" id="pass" v-model="form.password" required/>
          </div>
          <p v-if="showError" id="error">Wrong email or password</p>
          <button type="submit" class="btn btn-primary">Sign In</button>
        </form>
        <div class="link">
          <router-link to="/register">Dont have an account? Register</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue"
import {BASE_URL} from "@/services/API";

export default {
  components: {
    TheHeader
  },
  data() {
    return {
      form: {
        email: '',
        pass: ''
      },
      showError: false
    }
  },

  methods: {
    async loginUser() {
      await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: this.form.email,
          password: this.form.password,
        }),
      })
        .then(async response => {
          const data = await response.json();
          if (response.status == 200) {
            localStorage.setItem("token", data.jwt);
            this.$router.push("/");
          } else {
            console.log(data);
            this.form.email = "";
            this.form.password = "";
            this.showError = true;
          }
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    }
  }
};
</script>

<style scoped>
.card {
  margin: auto;
  max-width: 500px;
  padding: 10px;
}

input {
  width: 100%;
  padding: 8px;
}

.btn {
  margin-top: 10px;
}

.link a, .link {
  text-align: center;
  text-decoration: none;
}

.layout-login {
  margin: 125px auto auto;
}

#error {
  color: #b30000;
  font-weight: bold;
}
</style>
