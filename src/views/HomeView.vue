<template>
  <the-header class="shadow-sm"></the-header>
  <div class="container">
    <div class="row mt-4 text-start justify-content-center">
      <div class="product" v-for="product in products" :key="product.id" style="width: 16rem;">
        <product-comp :product="product"></product-comp>
      </div>
    </div>
    <button type="button" class="btn btn-secondary" v-if="isEmployee" @click="addProduct()">Add a new product</button>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue"
import {BASE_URL, config} from "@/API";
import axios from "axios";
import {mapGetters} from "vuex";
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

  computed: {
    ...mapGetters('auth', ['isEmployee']),
  },

  mounted() {
    this.fetchProducts();
  },

  methods: {
    fetchProducts: function () {
      axios
        .get(`${BASE_URL}/api/products/available`, config)
        .then(response => this.products = response.data.sort((x, y) => x.id - y.id)) // todo: move to API?
    },
    addProduct() {
      this.$router.push("/products/add")
    }
  }
}
</script>

<style scoped>

</style>
