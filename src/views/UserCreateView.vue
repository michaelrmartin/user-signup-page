<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/form", this.newUserParams)
        .then((response) => {
          console.log(response);
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="container" style="width: 50%">
    <form v-on:submit.prevent="submit()">
      <h1>Create User</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div class="mb-3">
        <label for="signupNameInput" class="form-label">Name</label>
        <input type="text" class="form-control" id="signupNameInput" v-model="newUserParams.name" />
      </div>
      <div class="mb-3">
        <label for="signupEmailInput" class="form-label">Email</label>
        <input type="email" class="form-control" id="signupEmailInput" v-model="newUserParams.email" />
      </div>
      <div class="mb-3">
        <label for="signupPasswordInput" class="form-label">Password</label>
        <input type="password" class="form-control" id="signupPasswordInput" v-model="newUserParams.password" />
      </div>
      <div class="mb-3">
        <label for="signupOccupationInput" class="form-label">Occupation</label>
        <input type="text" class="form-control" id="signupOccupationInput" v-model="newUserParams.occupation" />
      </div>
      <div class="mb-3">
        <label for="signupStateInput" class="form-label">State</label>
        <input type="text" class="form-control" id="signupStateInput" v-model="newUserParams.state" />
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>
