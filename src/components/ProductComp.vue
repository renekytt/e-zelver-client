<template>
  <div class="card m-2">
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <h5 class="card-subtitle mb-2 text-muted">{{ product.price }}€</h5>
      <p class="card-text ">
        Weight: {{ product.weight }}<br>
        Dimensions: {{ product.dimensions }}<br>
        Type: {{ product.type }}<br>
        Quantity: {{ product.quantity }}<br>
      </p>
      <button type="button" class="btn btn-warning" v-if="isAuthenticated" @click="addToCart()">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {BASE_URL, config} from "@/API";
import {mapGetters} from "vuex";

export default {
  name: "ProductComp",
  props: ['product'],

  data() {
    return {
      shoppingCartId: null,
    }
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
  },

  methods: {
    addToCart: function () {
      axios
        .get(`${BASE_URL}/api/carts/get`, config)
        .then(response => {
          axios
            .put(`${BASE_URL}/api/carts/${response.data.id}/items`, {
              productEntry: {
                id: this.product.id
              },
              quantity: 1
            }, config)
            .then(() => this.$parent.fetchProducts())
        })
    }
  }
}
</script>

<style scoped>

</style>
