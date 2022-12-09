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
      errorMessage: "",
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
          console.log(response);
          console.log("Options:", response.data);
        })
        .catch((error) => {
          console.log(error);
          this.errors = error.response.data.errors;
          this.errorMessage = error.response.statusText;
        });
    },
    createUser: function () {
      axios
        .post("/form", this.newUserParams)
        .then((response) => {
          console.log(response);
          console.log("Success:", response.data);
          this.message = "User successfully created!";
          this.newUserParams = {};
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
  <div class="container" style="width: 60%">
    <form v-on:submit.prevent="createUser()">
      <h1>Create User</h1>
      <div class="form-group mb-3">
        <label for="signupNameInput" class="form-label">Name</label>
        <input type="text" class="form-control" id="signupNameInput" v-model="newUserParams.name" required />
      </div>
      <div class="form-group mb-3">
        <label for="signupEmailInput" class="form-label">Email</label>
        <input type="email" class="form-control" id="signupEmailInput" v-model="newUserParams.email" required />
      </div>
      <div class="form-group mb-3">
        <label for="signupPasswordInput" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="signupPasswordInput"
          v-model="newUserParams.password"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="signupOccupationInput" class="form-label">Occupation</label>
        <select class="form-control" id="signupOccupationInput" v-model="newUserParams.occupation" required>
          <option v-for="occupation in options.occupations" v-bind:key="occupation.id">{{ occupation }}</option>
        </select>
      </div>
      <div class="form-group mb-3">
        <label for="signupStateInput" class="form-label">State</label>
        <select class="form-control" id="signupStateInput" v-model="newUserParams.state" required>
          <option v-for="state in options.states" v-bind:key="state.id">{{ state.name }}</option>
        </select>
      </div>
      <ul v-if="errorMessage">
        <li>{{ errorMessage }}</li>
      </ul>
      <br />
      <button type="submit" class="btn btn-secondary">Submit</button>
      <br />
      <br />
      <h2 v-if="createUser && successMessage">{{ successMessage }}</h2>
    </form>
  </div>
</template>

<style>
li {
  list-style-type: none;
  color: red;
  font-size: large;
  font-weight: bold;
}
</style>
