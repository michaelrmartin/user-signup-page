<script>
import axios from "axios";

export default {
  data: function () {
    return {
      selected: null,
      newUserParams: {},
      occupations: [],
      states: [],
      errors: [],
      message: "",
    };
  },
  created: function () {
    this.indexOccupations();
    this.indexStates();
  },
  methods: {
    indexOccupations: function () {
      axios.get("/form").then((response) => {
        this.occupations = response.data.occupations;
        console.log(response);
        console.log("All occupations:", response.data.occupations);
      });
    },
    indexStates: function () {
      axios.get("/form").then((response) => {
        this.states = response.data.states;
        console.log(response);
        console.log("All States:", response.data.states);
      });
    },
    submit: function () {
      axios
        .post("/form", this.newUserParams)
        .then((response) => {
          console.log(response);
          console.log("Success:", response.data);
          this.message = "User successfully created!";
          this.newUserParams = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="container" style="width: 60%">
    <form v-on:submit.prevent="submit()">
      <h1>Create User</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label for="signupNameInput" class="form-label">Name</label>
        <input type="text" class="form-control" id="signupNameInput" v-model="newUserParams.name" required />
      </div>
      <div class="form-group">
        <label for="signupEmailInput" class="form-label">Email</label>
        <input type="email" class="form-control" id="signupEmailInput" v-model="newUserParams.email" required />
      </div>
      <div class="form-group">
        <label for="signupPasswordInput" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="signupPasswordInput"
          v-model="newUserParams.password"
          required
        />
      </div>
      <div class="form-group">
        <label for="signupOccupationInput" class="form-label">Occupation</label>
        <select class="form-control" id="signupOccupationInput" v-model="newUserParams.occupation" required>
          <option v-for="occupation in occupations" v-bind:key="occupation.id">{{ occupation }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="signupStateInput" class="form-label">State</label>
        <select class="form-control" id="signupStateInput" v-model="newUserParams.state" required>
          <option v-for="state in states" v-bind:key="state.id">{{ state.name }}</option>
        </select>
      </div>
      <br />
      <button type="submit" class="btn btn-secondary">Submit</button>
      <br />
      <br />
      <h2 v-if="submit && message">{{ message }}</h2>
    </form>
  </div>
</template>
