<script>
import axios from "axios";

export default {
  data: function () {
    return {
      selected: null,
      newUserParams: {},
      options: {},
      error: false,
      errors: [],
      success: false,
      isLoading: false,
    };
  },
  created: function () {
    this.indexOptions();
  },
  methods: {
    indexOptions: function () {
      axios
        .get("/form")
        .then((response) => {
          this.options = response.data;
        })
        .catch((error) => {
          this.error = true;
          this.errors = error.response;
        });
    },
    createUser: function () {
      this.isLoading = true;
      axios
        .post("/form", this.newUserParams)
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.newUserParams = {};
          this.success = true;
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
          this.errors = error.response;
        });
      setTimeout(() => {
        this.success = false;
      }, 3000);
    },
  },
};
</script>

<template>
  <div class="container" style="width: 60%">
    <h1>Create New User</h1>
    <br />
    <form class="row g-3" v-on:submit.prevent="createUser()">
      <div class="mb-3 col-md-12">
        <label for="signupNameInput" class="form-label d-block text-start">Full Name</label>
        <input type="text" class="form-control" id="signupNameInput" v-model="newUserParams.name" required />
      </div>
      <div class="mb-3 col-6">
        <label for="signupEmailInput" class="form-label d-block text-start">Email</label>
        <input type="email" class="form-control" id="signupEmailInput" v-model="newUserParams.email" required />
      </div>
      <div class="mb-3 col-6">
        <label for="signupPasswordInput" class="form-label d-block text-start">Password</label>
        <input
          type="password"
          class="form-control"
          id="signupPasswordInput"
          v-model="newUserParams.password"
          required
        />
      </div>
      <div class="mb-3 col-8">
        <label for="signupOccupationInput" class="form-label d-block text-start">Occupation</label>
        <select class="form-control" id="signupOccupationInput" v-model="newUserParams.occupation" required>
          <option v-for="occupation in options.occupations" v-bind:key="occupation.id">{{ occupation }}</option>
        </select>
      </div>
      <div class="mb-3 col-4">
        <label for="signupStateInput" class="form-label d-block text-start">State</label>
        <select class="form-control" id="signupStateInput" v-model="newUserParams.state" required>
          <option v-for="state in options.states" v-bind:key="state.id">{{ state.name }}</option>
        </select>
      </div>
      <div class="col-12">
        <button type="submit" v-show="!isLoading" class="btn btn-primary col-4">Create</button>
        <button class="btn btn-primary" v-show="isLoading" type="button" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
      </div>
    </form>
    <br />
    <div v-if="success" class="alert alert-success fade show col-12" role="alert">User Created Successfully!</div>
    <div v-if="error" class="alert alert-danger fade show col-12" role="alert">{{ errors.statusText }}</div>
    <br />
  </div>
</template>

<style>
h1 {
  font-family: "Raleway", Helvetica, Arial, sans-serif;
  font-weight: bold;
}
form {
  padding: 5%;
  border-style: solid;
  border-width: 2px;
  background-color: rgb(159, 215, 250);
}
.form-label {
  font-weight: bold;
  font-family: "Raleway", Helvetica, Arial, sans-serif;
}
.show {
  transition: all 0.5s ease;
}
.fade {
  transition: all 0.5s ease;
}
li {
  list-style-type: none;
  color: red;
  font-size: large;
  font-weight: bold;
  border: red;
  border-style: double;
  text-justify: auto;
}
</style>
