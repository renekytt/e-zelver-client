<template>
  <the-header class="shadow-sm"></the-header>
  <div class="container">
    <div class="layout-login">
      <div class="card">
        <div class="card-header">Delivery details</div>
        <table class="table cart">
          <thead>
          <tr>
            <th scope="col" class="w-50">Status</th>
            <th scope="col" class="w-50">Location</th>
            <th scope="col" class="w-100">Delivery Time</th>
            <th scope="col" class="w-100">Delivery Price</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{status}}</td>
            <td>{{deliveryLocation}}</td>
            <td>{{deliveryTime}}</td>
            <td>{{deliveryPrice}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue"
import {BASE_URL, config} from "@/API";
import axios from "axios";

export default {
  components: {
    TheHeader,
  },

  data() {
    return {
      products: [],
      status: null,
      deliveryLocation: null,
      deliveryPrice: null,
      deliveryTime: null,
    }
  },

  mounted() {
    this.getCart();
  },

  methods: {
    getCart: function () {
      axios
        .get(`${BASE_URL}/api/carts/${this.$route.params.id}`, config)
        .then(response => {
          this.status = response.data.order.status
          this.deliveryLocation = response.data.order.deliveryLocation
          this.deliveryPrice = response.data.order.deliveryPrice
          this.deliveryTime = response.data.order.deliveryTime
        })
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
