// import the package
import VueAwesomePaginate from "vue-awesome-paginate";
// Register the package
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueAwesomePaginate);
});