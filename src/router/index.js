import Vue from "vue";
import Router from "vue-router";
import Synapsis from "@/components/Synapsis";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Synapsis",
      component: Synapsis
    }
  ]
});
