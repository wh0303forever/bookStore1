<template>
  <ion-page>
    <ion-content
      :fullscreen="false"
      scroll-y="true"
      scroll-x="false"
      color="light"
    >
      <book-card :book-info="item" v-for="item in bookInfo" :key="item" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import bookCard from "@/components/bookCard.vue";

export default defineComponent({
  name: "Tab1Page",
  setup() {
    return {
      bookInfo: ref([]),
    };
  },
  components: {
    IonContent,
    IonPage,
    bookCard,
  },
  ionViewDidLoad() {
    this.getOne();
  },
  mounted() {
    this.getOne();
  },
  watch: {
    $route() {
      this.getOne();
    },
  },
  updated() {
    this.getOne();
  },
  methods: {
    getOne() {
      var that = this;
      //console.log(that);
      //步骤一:创建异步对象
      var ajax = new XMLHttpRequest();
      //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
      ajax.open(
        "get",
        "http://42.192.250.118:9000/bookstore/bookmanagement/getbooks"
      );
      //步骤三:发送请求
      ajax.send();
      //步骤四:注册事件 onreadystatechange 状态改变就会调用
      ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
          var result = JSON.parse(ajax.responseText);
          console.log(result.data);
          that.bookInfo = result.data;
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
  background-color: #f5f6f9;
  width: 100%;
  height: 100%;
}
</style>
