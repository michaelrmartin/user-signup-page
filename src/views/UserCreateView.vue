<script>
import axios from "axios";

export default {
  data: function () {
    return {
      selected: null,
      newUserParams: {},
      options: {},
      errors: [],
      successMessage: "",
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
          this.errors = error.response.data.errors;
        });
    },
    createUser: function () {
      this.isLoading = true;
      axios
        .post("/form", this.newUserParams)
        .then((response) => {
          console.log(response);
          console.log("Success:", response.data);
          this.isLoading = false;
          this.newUserParams = {};
          this.successMessage = "User successfully created!";
        })
        .catch((error) => {
          console.log(error);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <h1>Create User</h1>
  <br />
  <form class="row g-3" v-on:submit.prevent="createUser()">
    <div class="mb-3 col-md-12">
      <label for="signupNameInput" class="form-label">Name</label>
      <input type="text" class="form-control" id="signupNameInput" v-model="newUserParams.name" required />
    </div>
    <div class="mb-3 col-6">
      <label for="signupEmailInput" class="form-label">Email</label>
      <input type="email" class="form-control" id="signupEmailInput" v-model="newUserParams.email" required />
    </div>
    <div class="mb-3 col-6">
      <label for="signupPasswordInput" class="form-label">Password</label>
      <input type="password" class="form-control" id="signupPasswordInput" v-model="newUserParams.password" required />
      <small class="text-danger" v-if="newUserParams.password && newUserParams.password.length < 6">
        Must be at least 6 characters
      </small>
      <small class="text-danger" v-if="newUserParams.password && newUserParams.password.length > 20">
        Must not be over 20 characters
      </small>
    </div>
    <div class="mb-3 col-8">
      <label for="signupOccupationInput" class="form-label">Occupation</label>
      <select class="form-control" id="signupOccupationInput" v-model="newUserParams.occupation" required>
        <option v-for="occupation in options.occupations" v-bind:key="occupation.id">{{ occupation }}</option>
      </select>
    </div>
    <div class="mb-3 col-4">
      <label for="signupStateInput" class="form-label">State</label>
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
  <ul>
    <li v-for="error in errors" v-bind:key="error">Error: {{ error }}</li>
  </ul>
  <h2 v-if="createUser && successMessage">{{ successMessage }}</h2>
</template>

<style>
form {
  padding-left: 20%;
  padding-right: 20%;
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
