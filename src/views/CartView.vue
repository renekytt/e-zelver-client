<template>
  <the-header class="shadow-sm"></the-header>
  <div class="container">
    <div class="mt-5">
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
            <td>{{ product.id }}</td>
            <td>
              <img :src="product.productEntry.image"/>
              <span>{{ product.productEntry.name }}</span>
            </td>
            <td>
              <input type="number" :name="`amount-${product.id}`" :id="`amount-${product.id}`"
                     @change="setItemQuantity(product.id,$event)" v-model="product.quantity" size="4" min="1" max="10"/>
            </td>
            <td><span>{{ parseFloat(product.productEntry.price).toFixed(2) }}</span></td>
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
            <td>{{ totalPrice }}</td>
            <td></td>
          </tr>
          </tbody>
        </table>
        <div class="card-header">Delivery Address</div>
        <div id="update-location">
          <input v-init type="text" name="email" v-model="deliveryLocation">
        </div>
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
  el: '#update-location',
  directives: {
    init: {
      bind(el) {
        el.value = el.getAttribute('value');
        el.dispatchEvent(new Event('input'));
      }
    }
  },
  data() {
    return {
      deliveryLocation: null,
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
        .get(`${BASE_URL}/api/carts/get`, config())
        .then(response => {
          this.shoppingCartId = response.data.id
          this.getCartItems()
        })
    },
    getCartItems: function () {
      axios
        .get(`${BASE_URL}/api/carts/${this.shoppingCartId}`, config())
        .then(response => {
          this.products = response.data.items.sort((x, y) => x.id - y.id);
          this.totalPrice = response.data.amount;
        })
    },
    checkout: function () {
      axios
        .put(`${BASE_URL}/api/carts/${this.shoppingCartId}`, {
          id: this.shoppingCartId,
          deliveryLocation: this.deliveryLocation
        }, config())
        .then(() => this.redirectToTracking(this.shoppingCartId))
    },
    deleteItem: function (id) {
      axios
        .delete(`${BASE_URL}/api/carts/${this.shoppingCartId}/items/${id}`, config())
        .then(response => {
          this.products = response.data.items.sort((x, y) => x.id - y.id);
          this.totalPrice = response.data.amount;
        })
    },
    setItemQuantity: function (id, event) {
      axios
        .put(`${BASE_URL}/api/carts/${this.shoppingCartId}/items/${id}`, {
          quantity: event.target.value
        }, config())
        .then(response => {
          this.products = response.data.items.sort((x, y) => x.id - y.id);
          this.totalPrice = response.data.amount;
        })
    },
    redirectToTracking() {
      this.$router.push({name: "tracking", params: {id: this.shoppingCartId}})
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

.link a {
  text-align: center;
  text-decoration: none;
}

.cart td {
  vertical-align: middle;
}

.cart img {
  width: 100px;
  height: auto;
  margin-right: 1em;
}
</style>
