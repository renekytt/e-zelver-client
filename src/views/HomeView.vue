<template>
  <the-header class="shadow-sm"></the-header>
  <div class="container">
    <div class="row mt-4 text-start">
      <div class="product" v-for="product in products" :key="product.id" style="width: 16rem;">
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
        .then(response => this.products = response.data.sort((x, y) => x.id - y.id))
    }
  }
}
</script>

<style scoped>

</style>
