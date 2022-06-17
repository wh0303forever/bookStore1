<template>
  <ion-page>
    <div style="background-color: white; width: 100vw"><h1>订单管理</h1></div>
    <div class="container">
      <table class="table" cellspacing="0" border="1" cellpadding="10">
        <tr>
          <th>订单编号</th>
          <th>图书名</th>
          <th>交易金额</th>
          <th>数目</th>
          <th>交易人</th>
          <th>日期</th>
          <th colspan="2">操作</th>
        </tr>
        <tr v-for="item in orders" :key="item">
          <td>{{ item.order_id }}</td>
          <td>{{ item.book_name }}</td>
          <td>￥{{ item.order_price }}</td>
          <td>￥{{ item.order_freight }}</td>
          <td>{{ item.buyer_name }}</td>
          <td>{{ item.date }}</td>
          <td>
            <button
              class="btn1"
              @click="deleteOrder(item.order_id)"
              :id="item.order_id"
            >
              删除
            </button>
          </td>
        </tr>
      </table>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonPage } from "@ionic/vue";
import data from "../store/index";

export default defineComponent({
  name: "orderManage",
  setup() {
    return {
      orders: ref([]),
    };
  },
  components: {
    IonPage,
  },
  mounted() {
    if (data.isLogin) this.getorders();
  },
  watch: {
    $route() {
      if (data.isLogin) this.getorders();
    },
  },
  updated() {
    if (data.isLogin) this.getorders();
  },
  methods: {
    toDetail() {
      this.$router.push({ path: "/bookDetail" });
    },
    deleteOrder(id: string) {
      var that = this;
      //console.log(event.target.id);
      //步骤一:创建异步对象
      var ajax = new XMLHttpRequest();
      //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
      ajax.open(
        "get",
        "http://42.192.250.118:9000/bookstore/ordermanagement/deleteorder?order_id=" +
          id
      );
      //步骤三:发送请求
      ajax.send();
      //步骤四:注册事件 onreadystatechange 状态改变就会调用
      ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
          var result = JSON.parse(ajax.responseText);
          console.log(result.message);
          if (result.message == "success") {
            that.$forceUpdate();
          }
        }
      };
    },
    getorders() {
      var that = this;
      //console.log(that);
      //步骤一:创建异步对象
      var ajax = new XMLHttpRequest();
      //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
      ajax.open(
        "get",
        "http://42.192.250.118:9000/bookstore/ordermanagement/getorders?seller_id=" +
          data.userData.user_id
      );
      //步骤三:发送请求
      ajax.send();
      //步骤四:注册事件 onreadystatechange 状态改变就会调用
      ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
          var result = JSON.parse(ajax.responseText);
          console.log(result.data);
          that.orders = result.data;
        }
      };
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
  height: 90vh;
  background-color: white;
  overflow: scroll;
}

.table {
  width: 190vw;
  height: fit-content;
  color: black;
  font-size: large;
  margin-top: 5vh;
  margin: 0 10px;
}

td {
  text-align: center;
  padding: auto;
  line-height: 20px;
  height: 30px;
  font-size: small;
}

.btn1 {
  border: 1;
  background-color: red;
  padding: 4px 12px;
}

.btn2 {
  border: 1;
  background-color: green;
  padding: 5px 12px;
}

th {
  background-color: lightblue;
  color: aliceblue;
}

.bottom {
  width: 100vw;
  height: 8vh;
  padding: 2vh 15vw;
}

.bottom button {
  width: 70vw;
  height: 4vh;
  background-color: green;
}

h1 {
  margin-left: 20px;
  height: 10vh;
  line-height: 10vh;
  background-color: white;
  color: black;
}
</style>
