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
            <th scope="col" class="w-50">Price (eur)</th>
            <th scope="col" class="w-50"></th>
          </tr>
          </thead>
          <tbody>

          <tr v-for="product in products" :key="product.id">
            <td>{{product.id}}</td>
            <td>
              <img
                :src="product.img"
              />
              <span>{{product.productEntry.name}}</span>
            </td>
            <td>
              <input type="number" name="" id="" @change="onChange(product.id,$event)" :value="product.quantity" size="4" min="1" max="10" />
            </td>
            <td><span>{{parseFloat(product.productEntry.price).toFixed(2)}}</span></td>
            <td>
              <button class="btn btn-danger" @click="deleteItem(product.id)">
                <span class="material-symbols-outlined"> remove</span>
              </button>
            </td>
          </tr>

          <tr>
            <td><b>Total</b></td>
            <td></td>
            <td></td>
            <td>{{totalPrice}}</td>
          </tr>
          </tbody>
        </table>
<!--        TODO: Delivery location-->
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
      products: [],
      totalPrice: 0,
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
          this.getCartItems()
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
        .then(response => {
          this.products = response.data;
          this.getTotalPrice();
        })
        .catch(error => console.log(error))
    },
    checkout: function () {
      axios
        .put(`${BASE_URL}/api/carts/${this.shoppingCartId}`, {
          id: this.shoppingCartId
         })//TODO: delivery location
        .then(response => {
            console.log(response);
            //TODO: redirect to tracking
        })
        .catch(error => console.log(error))
    },
    getTotalPrice: function () {
      this.totalPrice = parseFloat(this.products.reduce(
        (previousValue, currentValue) => previousValue + currentValue.productEntry.price, 0
      )).toFixed(2);
    },
    //TODO: deleteItem
    //TODO: changeCartItemQty
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
