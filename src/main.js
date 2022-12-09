import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "https://frontend-take-home.fetchrewards.com"
    : "https://frontend-take-home.fetchrewards.com";

createApp(App).use(router).mount("#app");
