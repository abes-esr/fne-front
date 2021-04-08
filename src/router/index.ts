import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/person-notice",
    name: "person-notice",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PersonNoticeView.vue")
  },
  {
    path: "/person-notice-detail/:itemId",
    name: "person-notice-detail",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/PersonNoticeDetailView.vue"
      )
  },
  {
    path: "/notice-list/:term",
    name: "notice-list",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NoticeListView.vue")
  },
  {
    path: "/person-notice/edit/:itemId",
    name: "edit-person-notice",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PersonNoticeView.vue")
  },
  {
    path: "/:notFound(.*)",
    name: "not-found",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NotFoundPage.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
