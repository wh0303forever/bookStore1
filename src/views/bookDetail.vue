<template>
  <ion-page>
    <div class="container">
      <img :src="bookInfo.book_img" class="book-cover" />
      <div class="book-info">
        <p class="book-title">{{ bookInfo.book_name }}</p>
        <p class="book-price">￥{{ bookInfo.book_price }}</p>
        <p class="book-freight">运费：￥{{ bookInfo.book_freight }}</p>
        <p class="book-freight">数量：{{ bookInfo.book_num }}</p>
        <p class="book-introduction">
          {{ bookInfo.book_introduction }}
        </p>
      </div>

      <div class="btn-zone">
        <button class="btn-style" @click="confirmBuy">购买</button>
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
import { IonPage, alertController, IonToast } from "@ionic/vue";
import data from "./../store/index";

export default defineComponent({
  name: "bookDetail",
  components: {
    IonPage,
    IonToast,
  },
  setup() {
    return {
      isOpenRef: ref(false),
      buttons: ["取消", "确认"],
      book_id: ref(""),
      bookInfo: ref({
        book_freight: ref(),
        book_id: ref(),
        book_img: ref(),
        book_introduction: ref(),
        book_name: ref(),
        book_num: ref(),
        book_price: ref(),
        is_deleted: ref(),
        user_id: ref(),
      }),
      toastMessage: ref(""),
    };
  },
  mounted() {
    var id = this.$route.query.id;
    if (typeof id == "string") this.book_id = id;
    this.getOne();
  },
  methods: {
    getOne() {
      var that = this;
      //console.log(that);
      //步骤一:创建异步对象
      var ajax = new XMLHttpRequest();
      //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
      var url =
        "http://42.192.250.118:9000/bookstore/bookmanagement/getbookInfo";
      url += "?id=" + this.book_id;
      ajax.open("get", url);
      //步骤三:发送请求
      ajax.send();
      //步骤四:注册事件 onreadystatechange 状态改变就会调用
      ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
          var result = JSON.parse(ajax.responseText);
          that.bookInfo = result.data;
        }
      };
    },
    setOpen(state: boolean) {
      this.isOpenRef = state;
    },
    confirmBuy() {
      if (data.isLogin) this.presentAlertConfirm();
      else {
        this.toastMessage = "请先登录";
        this.setOpen(true);
      }
    },
    async presentAlertConfirm() {
      var that = this;
      const alert = await alertController.create({
        header: "提醒",
        message: "确认购买本商品？",
        buttons: [
          {
            text: "取消",
            role: "cancel",
            cssClass: "secondary",
            id: "cancel-button",
          },
          {
            text: "确认",
            id: "confirm-button",
            handler: () => {
              //发送购买请求
              var that = this;
              //console.log(event.target.id);
              //步骤一:创建异步对象
              var ajax = new XMLHttpRequest();
              //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
              ajax.open(
                "get",
                "http://42.192.250.118:9000/bookstore/ordermanagement/buy?" +
                  "book_id=" +
                  this.bookInfo.book_id +
                  "&" +
                  "book_name=" +
                  this.bookInfo.book_name +
                  "&" +
                  "buyer_id=" +
                  data.userData.user_id +
                  "&" +
                  "buyer_name=" +
                  data.userData.user_name +
                  "&" +
                  "order_price=" +
                  this.bookInfo.book_price +
                  "&" +
                  "seller_id=" +
                  this.bookInfo.user_id +
                  "&" +
                  "order_freight=" +
                  this.bookInfo.book_freight +
                  "&"
              );
              //步骤三:发送请求
              ajax.send();
              //步骤四:注册事件 onreadystatechange 状态改变就会调用
              ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                  var result = JSON.parse(ajax.responseText);
                  console.log(result);
                  if (result.message == "success") {
                    that.toastMessage = "购买成功";
                    that.setOpen(true);
                    that.$forceUpdate();
                  } else {
                    that.toastMessage = "已卖空";
                    that.setOpen(true);
                    that.$forceUpdate();
                  }
                }
              };
            },
          },
        ],
      });
      return alert.present();
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
  overflow: scroll;
  background-color: white;
}

.book-cover {
  width: 80vw;
  height: fit-content;
  margin-left: 10vw;
}

.book-info {
  width: 100vw;
  height: fit-content;
  padding: 10vw;
  background-color: white;
}

.book-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  color: black;
  font-size: 18px;
  font-weight: bold;
}

.book-introduction {
  color: black;
  font-size: 16px;
  margin-top: 10px;
}

.book-price {
  color: red;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}
.book-freight {
  color: grey;
  font-size: 14px;
  margin-top: 5px;
  display: inline-block;
  margin-right: 10vw;
}

.btn-zone {
  width: 100vw;
  height: 10vw;
  position: absolute;
  bottom: 0;
  z-index: 10;
}

.btn-style {
  width: 80vw;
  margin-left: 10vw;
  height: 8vw;
  margin-top: 1vw;
  background-color: green;
  color: white;
}
</style>
