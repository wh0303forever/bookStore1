<template>
  <ion-page>
    <div class="container">
      <div class="logo-zone">
        <img src="../img/logo1.png" class="logo-image" />
      </div>
      <div class="info-zone">
        <div class="input-zone">
          <IonInput
            maxlength="10"
            placeholder="请输入用户名"
            type="text"
            color="primary"
            v-model="username"
          ></IonInput>
        </div>
        <div class="input-zone">
          <IonInput
            maxlength="16"
            placeholder="请输入密码"
            type="password"
            color="primary"
            v-model="password"
          ></IonInput>
        </div>
      </div>
      <div class="btn-zone">
        <button class="btn-login" @click="login">登录</button>
        <button class="btn-register" @click="toRegister">注册</button>
        <button class="btn-cancel" @click="toPersonal">取消</button>
      </div>
    </div>
    <ion-toast
      :is-open="isOpenRef"
      :message="toastMessage"
      :duration="1000"
      position="middle"
      @didDismiss="setOpen(false)"
      color="warning"
    >
    </ion-toast>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonPage, IonInput, IonToast } from "@ionic/vue";
import data from "../store/index";
import { thisTypeAnnotation } from "@babel/types";

export default defineComponent({
  name: "loginVue",
  components: {
    IonPage,
    IonInput,
    IonToast,
  },
  setup() {
    return {
      username: ref(""),
      password: ref(""),
      isOpenRef: ref(false),
      toastMessage: ref(""),
    };
  },
  methods: {
    toPersonal() {
      this.$router.push({ path: "/tabs/tab2" });
    },
    toRegister() {
      this.$router.push({ path: "/register" });
    },
    login() {
      if (this.username == "") {
        this.toastMessage = "请输入您的用户名";
        this.setOpen(true);
      } else if (this.password == "") {
        this.toastMessage = "请输入您的密码";
        this.setOpen(true);
      } else {
        var that = this;
        //console.log(that);
        //步骤一:创建异步对象
        var ajax = new XMLHttpRequest();
        //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
        var url = "http://42.192.250.118:9000/bookstore/usermanagement/login";
        url += "?username=" + this.username + "&password=" + this.password;
        ajax.open("get", url);
        //步骤三:发送请求
        ajax.send();
        //步骤四:注册事件 onreadystatechange 状态改变就会调用
        ajax.onreadystatechange = function () {
          if (ajax.readyState == 4 && ajax.status == 200) {
            var result = JSON.parse(ajax.responseText);
            if (result.message == "登录成功") {
              data.isLogin = true;
              data.userData = result.data;
              that.toastMessage = "登录成功";
              that.setOpen(true);
              that.$router.push({
                path: "/tabs/tab2",
              });
            } else {
              that.toastMessage = "登录失败";
              that.setOpen(true);
            }
          }
        };
      }
    },
    setOpen(state: boolean) {
      this.isOpenRef = state;
    },
  },
});
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.container {
  width: 100%;
  height: 100%;
  background-color: white;
}

.logo-zone {
  width: 100vw;
  height: 30vh;
  padding-top: 10vh;
  background-color: white;
}

.logo-image {
  height: 15vh;
  width: fit-content;
  display: block;
  margin: auto;
}

.info-zone {
  height: 20vh;
  width: 100vw;
  background-color: white;
  padding-left: 15vw;
  padding-right: 15vw;
}
.input-zone {
  widows: 70vw;
  height: 10vh;
}

.btn-zone {
  width: 100vw;
  height: 20vh;
  padding: 5vh 15vw;
}

.btn-login {
  width: 70vw;
  height: 5vh;
  background-color: green;
}

.btn-register {
  width: 15vw;
  border: 0;
  background-color: white;
  float: right;
  margin-top: 3vh;
  color: blue;
}

.btn-cancel {
  width: 15vw;
  border: 0;
  background-color: white;
  float: left;
  margin-top: 3vh;
  color: gray;
}
</style>
