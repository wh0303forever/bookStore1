<template>
  <ion-page>
    <div class="container">
      <div class="user-name">
        <p>{{ username }}</p>
      </div>
      <ion-list>
        <ion-item detail @click="toLogin" color="light">
          <ion-label>登录</ion-label>
        </ion-item>
        <ion-item detail color="light" @click="toPersonalInfo">
          <ion-label>个人资料</ion-label>
        </ion-item>
        <ion-item detail color="light" @click="toOrderManage">
          <ion-label>订单管理</ion-label>
        </ion-item>
        <ion-item detail color="light" @click="toBookManage">
          <ion-label>图书管理</ion-label>
        </ion-item>
      </ion-list>
    </div>
    <ion-toast
      :is-open="isOpenRef"
      :message="toastMessage"
      :duration="2000"
      position="middle"
      @didDismiss="setOpen(false)"
    >
    </ion-toast>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonPage, IonList, IonLabel, IonItem, IonToast } from "@ionic/vue";
import data from "../store/index";

export default defineComponent({
  name: "Tab2Page",
  components: {
    IonPage,
    IonList,
    IonLabel,
    IonItem,
    IonToast,
  },
  //监听函数
  watch: {
    $route() {
      this.username = data.userData.user_name;
      console.log("touch");
    },
  },
  mounted() {
    this.username = data.userData.user_name;
  },
  methods: {
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    toBookManage() {
      if (data.isLogin) this.$router.push({ path: "/bookManage" });
      else {
        this.toastMessage = "请先登录";
        this.setOpen(true);
      }
    },
    setOpen(state: boolean) {
      this.isOpenRef = state;
    },
    toOrderManage() {
      if (data.isLogin) this.$router.push({ path: "/orderManage" });
      else {
        this.toastMessage = "请先登录";
        this.setOpen(true);
      }
    },
    toPersonalInfo() {
      if (data.isLogin) this.$router.push({ path: "/personalInfo" });
      else {
        this.toastMessage = "请先登录";
        this.setOpen(true);
      }
    },
  },
  setup() {
    return {
      isOpenRef: ref(false),
      data,
      username: ref(""),
      toastMessage: ref(""),
    };
  },
});
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.container {
  width: 100vw;
  height: 100vh;
  background-color: white;
  color: black;
}

.user-name {
  width: 100%;
  height: 20vh;
  color: black;
}
.user-name p {
  line-height: 20vh;
  font-size: larger;
  font-weight: bold;
  margin-left: 10vw;
}
</style>
