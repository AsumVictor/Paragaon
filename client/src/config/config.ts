export let API_BASE_URL = "";

if (process.env.NODE_ENV == "development") {
  API_BASE_URL = "http://127.0.0.1:5000/api";
} else {
  API_BASE_URL = process.env.API;
}