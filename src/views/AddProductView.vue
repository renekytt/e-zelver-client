<template>
  <the-header class="shadow-sm"></the-header>
  <product-form :product="product" :onSubmit="addProduct"></product-form>
</template>

<script>
import axios from "axios";
import { BASE_URL, config } from "@/API";
import TheHeader from "../components/TheHeader.vue";
import ProductForm from "../components/ProductForm.vue";

export default {
  components: {
    TheHeader,
    ProductForm,
  },

  data() {
    return {
      product: {
        name: "test",
        image: "",
        price: 0.0,
        type: "",
        quantity: 0,
        weight: 0.0,
        dimensions: "0x0x0",
      },
    };
  },

  mounted() {},

  methods: {
    addProduct: function (product) {
      axios.post(`${BASE_URL}/api/products`, product, config).then(() => this.$router.push("/"));
    },
  },
};
</script>

<style scoped></style>
