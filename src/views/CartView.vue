<template>
  <the-header class="shadow-sm"></the-header>
  <div class="container">
    <div class="layout-login">
      <div class="card">
        <div class="card-header">Cart</div>
        <table class="table cart">
          <thead>
          <tr>
            <th scope="col" class="w-50">Product ID</th>
            <th scope="col" class="w-50">Item</th>
            <th scope="col" class="w-50">Quantity</th>
            <th scope="col" class="w-50">Price</th>
            <th scope="col" class="w-50"></th>
          </tr>
          </thead>
          <tbody>

          <tr v-for="product in allItems" :key="product.id">
            <td>{{product.id}}</td>
            <td class="d-flex">
              <img
                :src="product.img"
              />
              <span>{{product.title}}</span>
            </td>
            <td>
              <input type="number" name="" id="" @change="onChange(product.id,$event)" :value="product.count" size="4" min="1" max="10" />
            </td>
            <td><span>{{parseFloat(product.price*70).toFixed(2)}}</span></td>
            <td>
              <button class="btn btn-danger" @click="deleteItem(product.id)">
                <span class="material-symbols-outlined"> delete_forever</span>
              </button>
            </td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td>{{items}}</td>
            <td>{{total}} eur</td>
            <td><button class="btn btn-success" @click="addItem">Increase quantity</button></td>
            <td> <button class="btn btn-success" @click="removeItem">Decrease quantity</button></td>
          </tr>
          </tbody>
        </table>
        <button class="btn btn-success" @click="checkout">Buy Now</button>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue"
import axios from "axios";
import {BASE_URL, config} from "@/API";

export default {
  components: {
    TheHeader
  },
  data() {
    return {
      showError: false,
      shoppingCartId: null,
    }
  },

  mounted() {
    this.getCartId();
  },
  methods: {
    getCartId: function () {
      axios
        .get(`${BASE_URL}/api/carts/get`, config)
        .then(response => {
          this.shoppingCartId = response.data.id
          this.getCart()
        })
    },
    getCart: function () {
      axios
        .get(`${BASE_URL}/api/carts/${this.shoppingCartId}`, config)
        .then(response => (this.products = response.data))
        .catch(error => console.log(error))
    },
    getCartItems: function () {
      axios
        .get(`${BASE_URL}/api/carts/${this.shoppingCartId}/items`, config)
        .then(response => (this.products = response.data))
        .catch(error => console.log(error))
    },
    putCart: function () {
      axios
        .put(`${BASE_URL}/api/carts/${this.shoppingCartId}`, {
          id: this.shoppingCartId
         })
        .then(response => (this.products = response.data))
        .catch(error => console.log(error))
    },
  }
};
</script>

<style scoped>
.card {
  margin: auto;
  max-width: 800px;
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
