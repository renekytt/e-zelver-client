<template>
  <div class="container mt-3">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" name="name" id="name" class="form-control" placeholder="Name" v-model="productState.name" />
    </div>
    <div class="mb-3">
      <label for="image" class="form-label">Image URL</label>
      <input
        type="text"
        name="image"
        id="image"
        class="form-control"
        placeholder="Image URL"
        v-model="productState.image"
      />
    </div>
    <div class="mb-3">
      <label for="price" class="form-label">Price</label>
      <input
        type="number"
        name="price"
        id="price"
        class="form-control"
        placeholder="Price"
        v-model="productState.price"
      />
    </div>
    <div class="mb-3">
      <label for="type" class="form-label">Type</label>
      <input type="text" name="type" id="type" class="form-control" placeholder="Type" v-model="productState.type" />
    </div>
    <div class="mb-3">
      <label for="quantity" class="form-label">Quantity</label>
      <input
        type="number"
        name="quantity"
        id="quantity"
        class="form-control"
        placeholder="Quantity"
        v-model="productState.quantity"
      />
    </div>
    <div class="mb-3">
      <label for="weight" class="form-label">Weight</label>
      <input
        type="number"
        name="weight"
        id="weight"
        class="form-control"
        placeholder="Weight"
        v-model="productState.weight"
      />
    </div>
    <div class="mb-3">
      <label for="dimensions" class="form-label">Dimensions</label>
      <input
        type="text"
        name="dimensions"
        id="dimensions"
        class="form-control"
        placeholder="Dimensions"
        v-model="productState.dimensions"
      />
    </div>
    <button class="btn btn-warning" @click="onSubmit(productState)">Submit</button>
  </div>
</template>

<script>
export default {
  name: "ProductForm",
  props: ["product", "onSubmit"],
  data: function () {
    return {
      productState: { ...this.product },
    };
  },
};
</script>

<style scoped></style>
