<template>
  <ion-page>
    <div class="container">
      <h1>个人信息</h1>
      <table border="0" class="table">
        <tr>
          <td class="td1">用户名：</td>
          <td class="td2">{{ user.user_name }}</td>
          <td class="td1"><button>修改</button></td>
        </tr>
        <tr>
          <td class="td1">密码：</td>
          <td class="td2">{{ user.user_password }}</td>
          <td class="td1"><button>修改</button></td>
        </tr>
      </table>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonPage } from "@ionic/vue";
import data from "@/store";

export default defineComponent({
  name: "personalInfo",
  setup() {
    return {
      user: ref({}),
    };
  },
  components: {
    IonPage,
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
  methods: {
    toDetail() {
      this.$router.push({ path: "/bookDetail" });
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
</style>
