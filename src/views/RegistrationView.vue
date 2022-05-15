<template>
<the-header class="shadow-sm"></the-header>
  <div class="container">
      <div class="layout-login">
          <div class="card">
              <div class="card-header">Register</div>
              <form @submit.prevent="registerUser">
                <label for="name">Name</label>
                <div class="card-text"><input type="text" id="name" v-model="form.name" required></div>
                  <label for="email">Email</label>
                  <div class="card-text"><input type="email" id="email" v-model="form.email" required></div>
                  <label for="age">Age</label>
                  <div class="card-text"><input type="number" id="age" v-model="form.age" required></div>
                  <label for="pass">Password</label>
                  <div class="card-text"><input type="password" id="pass" v-model="form.password" required></div>
                  <button type="submit" class="btn btn-primary">Register</button>
              </form>
              <div class="link"><router-link to="/login">Already have an account? Login</router-link></div>
          </div>
      </div>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue"
export default {
    components:{
        TheHeader
    },
    data() {
        return {
            form:{
                name:'',
                pass:'',
                email:'',
                age:''
            }
        }
    },
  methods:{
      async registerUser() {
      await fetch("https://e-zelver-api.herokuapp.com/api/auth/customers/register", {  
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          age: this.form.age
        }),
      })
      .then(async response => {
        const data = await response.json();
        if(response.status==200){
          localStorage.setItem("token", data.jwt);
          this.$router.push("/")
        }else{
          console.log(data);
        }
      })
      .catch(error => {
        console.error("There was an error!", error);
        }); 
      }
  }  
}
</script>

<style scoped>
.card{
    margin:auto;
    max-width: 500px;
    padding:10px;
}
input{
    width: 100%;
    padding:8px;
}
.btn{
    margin-top: 10px;
}
.link a , .link{
    text-align: center;
    text-decoration: none ;
}
.layout-login {
  margin: auto;
  margin-top: 125px;
}
</style>