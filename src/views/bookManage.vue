<template>
  <ion-page>
    <div style="background-color: white; width: 100vw"><h1>图书管理</h1></div>
    <div class="container">
      <table class="table" cellspacing="0" border="1" cellpadding="10">
        <tr>
          <th>id</th>
          <th>图书名</th>
          <th>价格：￥</th>
          <th>运费：￥</th>
          <th>数目</th>
          <th colspan="2">操作</th>
        </tr>
        <tr v-for="item in books" :key="item">
          <td>{{ item.book_id }}</td>
          <td>{{ item.book_name }}</td>
          <td>￥{{ item.book_price }}</td>
          <td>￥{{ item.book_freight }}</td>
          <td>{{ item.book_num }}</td>
          <td>
            <button class="btn1" @click="deleteBooks(item.book_id)">
              下架
            </button>
          </td>
        </tr>
      </table>
    </div>
    <div class="bottom">
      <button @click="toAddBook">添加图书</button>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonPage } from "@ionic/vue";
import data from "./../store/index";

export default defineComponent({
  name: "bookManage",
  setup() {
    return {
      books: ref([]),
    };
  },
  components: {
    IonPage,
  },
  mounted() {
    this.getbooks();
  },
  watch: {
    $route() {
      if (data.isLogin) this.getbooks();
    },
  },
  updated() {
    if (data.isLogin) this.getbooks();
  },
  methods: {
    deleteBooks(id: string) {
      var that = this;
      //console.log(event.target.id);
      //步骤一:创建异步对象
      var ajax = new XMLHttpRequest();
      //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
      ajax.open(
        "get",
        "http://42.192.250.118:9000/bookstore/bookmanagement/deletebook?book_id=" +
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
    toDetail() {
      this.$router.push({ path: "/bookDetail" });
    },
    toAddBook() {
      this.$router.push({ path: "/addBook" });
    },
    getbooks() {
      var that = this;
      //console.log(that);
      //步骤一:创建异步对象
      var ajax = new XMLHttpRequest();
      //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
      ajax.open(
        "get",
        "http://42.192.250.118:9000/bookstore/bookmanagement/getbookofuser?user_id=" +
          data.userData.user_id
      );
      //步骤三:发送请求
      ajax.send();
      //步骤四:注册事件 onreadystatechange 状态改变就会调用
      ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
          var result = JSON.parse(ajax.responseText);
          console.log(result.data);
          that.books = result.data;
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
  height: 82vh;
  background-color: white;
  overflow: scroll;
}

.table {
  width: 150vw;
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
  background-color: white;
}

.bottom button {
  width: 70vw;
  height: 4vh;
  background-color: green;
  color: white;
}

h1 {
  margin-left: 20px;
  height: 10vh;
  line-height: 10vh;
  background-color: white;
  color: black;
}
</style>
