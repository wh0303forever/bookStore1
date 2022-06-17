import { createRouter, createWebHashHistory } from "@ionic/vue-router";
import { createWebHistory, RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import bookDetail from "../views/bookDetail.vue";
import login from "../views/login.vue";
import register from "../views/register.vue";
import bookManage from "../views/bookManage.vue";
import orderManage from "../views/orderManage.vue";
import personalInfo from "../views/personalInfo.vue";
import addBook from "../views/addBook.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/tab1",
  },
  {
    path: "/bookDetail",
    component: bookDetail,
  },
  {
    path: "/personalInfo",
    component: personalInfo,
  },
  {
    path: "/addBook",
    component: addBook,
  },
  {
    path: "/bookManage",
    component: bookManage,
  },
  {
    path: "/orderManage",
    component: orderManage,
  },
  {
    path: "/login",
    component: login,
  },
  {
    path: "/register",
    component: register,
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/Tab1Page.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/Tab2Page.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory("./"),
  routes,
});

export default router;
