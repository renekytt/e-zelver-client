<template>
  <the-header class="shadow-sm"></the-header>
  <div class="container">
    <div class="row mt-4 text-start">
      <div class="card m-2" v-for="product in products" :key="product.id" style="width: 16rem;">
        <product-comp :product="product"></product-comp>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue"
import {BASE_URL, config} from "@/API";
import axios from "axios";
import ProductComp from "@/components/ProductComp";

export default {
  components: {
    TheHeader,
    ProductComp
  },

  data() {
    return {
      products: [],
    }
  },

  mounted() {
    this.fetchProducts();
  },

  methods: {
    fetchProducts: function () {
      axios
        .get(`${BASE_URL}/api/products/available`, config)
        .then(response => (this.products = response.data))
        .catch(error => console.log(error))
    }
  }
  // need to add generating random id/cart if the first product is added
  // Math.ceil(Math.random()*1000000) for example
}
</script>

<style scoped>

</style>
