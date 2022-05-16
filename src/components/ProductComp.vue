<template>
  <div class="card-body">
    <h5 class="card-title">{{ product.name }}</h5>
    <h5 class="card-subtitle mb-2 text-muted">{{ product.price }}€</h5>
    <p class="card-text ">
      Weight: {{ product.weight }}<br>
      Dimensions: {{ product.dimensions }}<br>
      Type: {{ product.type }}<br>
    </p>
    <button type="button" class="btn btn-warning" @click="addToCart()">
      Add to Cart
    </button>
  </div>
</template>

<script>
export default {
  name: "ProductComp",
  props: ['product'],

  methods: {
    addToCart() {
      console.log("TODO: Add to card");
    }
  }
}
</script>

<style scoped>

</style>
