<template>
  <the-header class="shadow-sm"></the-header>
  <product-form v-if="product !== null" :product="product" :onSubmit="editProduct"></product-form>
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
      product: null,
    };
  },

  mounted() {
    this.fetchProduct();
  },

  methods: {
    fetchProduct: function () {
      axios
        .get(`${BASE_URL}/api/products/${this.$route.params.id}`, config)
        .then((response) => (this.product = response.data));
    },
    editProduct: function (product) {
      axios
        .put(`${BASE_URL}/api/products/${this.$route.params.id}`, product, config)
        .then(() => this.$router.push("/"));
    },
  },
};
</script>

<style scoped></style>
