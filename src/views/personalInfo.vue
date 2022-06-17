<template>
  <ion-page>
    <div class="container">
      <h1>个人信息</h1>
      <table border="0" class="table">
        <tr>
          <td class="td1">用户名：</td>
          <td class="td2">{{ user.user_name }}</td>
        </tr>
        <tr>
          <td class="td1">密码：</td>
          <td class="td2">{{ user.user_password }}</td>
          <td class="td1"><button @click="pwdChange">修改</button></td>
        </tr>
      </table>
    </div>
    <div class="popoverDiv" v-if="usernameChange || passwordChange">
      <input
        v-model="_username"
        placeholder="请输入新用户名"
        v-if="usernameChange"
        maxlength="10"
      />
      <input
        v-model="_password"
        placeholder="请输入新密码"
        v-if="passwordChange"
        maxlength="16"
        type="password"
      />
      <button class="btn_cancel" @click="cancel">取消</button>
      <button class="btn_confirm" @click="confirm">确认</button>
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
import { IonPage, IonToast } from "@ionic/vue";
import data from "@/store";

export default defineComponent({
  name: "personalInfo",
  setup() {
    return {
      user: ref({}),
      popoverOpen: ref(false),
      _username: ref(""),
      _password: ref(""),
      usernameChange: ref(false),
      passwordChange: ref(false),
      toastMessage: ref(""),
      isOpenRef: ref(false),
    };
  },
  components: {
    IonPage,
    IonToast,
  },
  mounted() {
    var that = this;
    //console.log(that);
    //步骤一:创建异步对象
    var ajax = new XMLHttpRequest();
    //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
    ajax.open(
      "get",
      "http://42.192.250.118:9000/bookstore/usermanagement/getUserInfo?user_id=" +
        data.userData.user_id
    );
    //步骤三:发送请求
    ajax.send();
    //步骤四:注册事件 onreadystatechange 状态改变就会调用
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4 && ajax.status == 200) {
        var result = JSON.parse(ajax.responseText);
        console.log(result.data);
        that.user = result.data;
      }
    };
  },
  updated() {
    var that = this;
    //console.log(that);
    //步骤一:创建异步对象
    var ajax = new XMLHttpRequest();
    //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
    ajax.open(
      "get",
      "http://42.192.250.118:9000/bookstore/usermanagement/getUserInfo?user_id=" +
        data.userData.user_id
    );
    //步骤三:发送请求
    ajax.send();
    //步骤四:注册事件 onreadystatechange 状态改变就会调用
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4 && ajax.status == 200) {
        var result = JSON.parse(ajax.responseText);
        console.log(result.data);
        that.user = result.data;
      }
    };
  },
  methods: {
    setOpen(state: boolean) {
      this.isOpenRef = state;
    },
    toDetail() {
      this.$router.push({ path: "/bookDetail" });
    },
    unameChange() {
      this.usernameChange = true;
      this.passwordChange = false;
    },
    pwdChange() {
      this.usernameChange = false;
      this.passwordChange = true;
    },
    cancel() {
      this.usernameChange = false;
      this.passwordChange = false;
    },
    confirm() {
      if (this._password == "") {
        this.toastMessage = "不能为空";
        this.setOpen(true);
      } else {
        var that = this;
        //console.log(event.target.id);
        //步骤一:创建异步对象
        var ajax = new XMLHttpRequest();
        //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
        ajax.open(
          "get",
          "http://42.192.250.118:9000/bookstore/usermanagement/updatepassword?password=" +
            that._password +
            "&user_id=" +
            data.userData.user_id
        );
        //步骤三:发送请求
        ajax.send();
        //步骤四:注册事件 onreadystatechange 状态改变就会调用
        ajax.onreadystatechange = function () {
          if (ajax.readyState == 4 && ajax.status == 200) {
            var result = JSON.parse(ajax.responseText);
            if (result.message == "success") {
              that.$forceUpdate();
              that.toastMessage = "修改成功";
              that.setOpen(true);
              that.passwordChange = false;
              that.$forceUpdate();
            } else {
              that.toastMessage = "修改失败";
              that.setOpen(true);
            }
          }
        };
      }
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
  width: 100vw;
  height: 100vh;
  background-color: white;
  overflow: scroll;
  padding: 5vh 5vw;
}

.table {
  width: 90vw;
  height: fit-content;
  color: black;
  font-size: large;
  text-align: left;
  margin-top: 5vh;
}

.td1 {
  width: 25%;
  font-size: medium;
}
.td2 {
  width: 50%;
}

.td1 button {
  text-decoration: underline;
  color: blue;
  background-color: white;
}

tr {
  height: 60px;
  margin-top: 30px;
}

h1 {
  margin-left: 20px;
  height: 10vh;
  line-height: 10vh;
  background-color: white;
  color: black;
}

.popoverDiv {
  width: 80vw;
  height: 16vh;
  border-radius: 0;
  background-color: #f5f6f5;
  position: absolute;
  top: 40vh;
  left: 10vw;
}

.btn_confirm {
  width: 25vw;
  height: 4vh;
  background-color: green;
  display: inline-block;
}

.btn_cancel {
  width: 25vw;
  height: 4vh;
  background-color: gray;
  display: inline-block;
  margin-left: 10vw;
  margin-right: 10vw;
}

.popoverDiv input {
  width: 60vw;
  height: 5vh;
  margin: 2.5vh 10vw;
  border: 0;
  color: black;
}
</style>
