<template>
  <the-header class="shadow-sm"></the-header>
  <div class="container">
    <div class="card mt-5">
      <div class="card-header">Customer orders</div>
      <table class="table">
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Products</th>
          <th scope="col">Price</th>
          <th scope="col">Tracking</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>
            {{ order.id }}
          </td>
          <td>
            <span v-for="item in order.shoppingCart.items" :key="item.id">
              {{ item.productEntry.name }} ({{ item.quantity }})<br />
            </span>
          </td>
          <td>
            {{ order.deliveryPrice + order.shoppingCart.amount }}
          </td>
          <td>
            <router-link :to="{ name: 'tracking', params: { id: order.shoppingCart.id }}">Link</router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue"
import axios from "axios";
import {BASE_URL, config} from "@/API";

export default {
  name: "OrdersView",
  components: {
    TheHeader
  },

  data() {
    return {
      orders: [],
    }
  },

  mounted() {
    this.getCustomerOrders();
  },

  methods: {
    getCustomerOrders: function () {
      axios
        .get(`${BASE_URL}/api/orders/`, config())
        .then(response => this.orders = response.data)
    }
  }
}
</script>

<style scoped>
.card {
  margin: auto;
  max-width: 800px;
  padding: 10px;
}

li {
  list-style-type: none;
}
</style>
