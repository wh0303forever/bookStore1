<template>
  <ion-page>
    <div class="container">
      <img :src="cover_img" class="cover" id="cover" />
      <button class="btn-upload" @click="getpic('CAMERA')">拍摄</button>
      <button class="btn-upload" @click="getpic('PHOTOS')">从相册选择</button>
      <div class="info-zone">
        <p>图书名</p>
        <input
          type="text"
          :maxlength="15"
          :minlength="1"
          placeholder="请输入图书名"
          v-model="book_name"
        />
        <p>价格（元）</p>
        <input
          type="number"
          :min="1"
          step="1"
          placeholder="请输入价格"
          :max="9999"
          v-on:change="priceChange"
          v-model="price"
        />
        <p>运费（元）</p>
        <input
          type="number"
          :min="1"
          step="1"
          placeholder="请输入运费"
          :max="9999"
          v-on:change="freightChange"
          v-model="freight"
        />
        <p>数量（本）</p>
        <input
          type="number"
          :min="1"
          step="1"
          placeholder="请输入数量"
          :max="9999"
          v-on:change="numChange"
          v-model="num"
        />
        <p>简介</p>
        <textarea
          placeholder="请输入简介"
          rows="5"
          :maxlength="100"
          :minlength="1"
          v-model="introduction"
        >
        </textarea>
      </div>
      <button class="btn-submit" @click="submit">点击提交</button>
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
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import COS from "cos-js-sdk-v5";
import data from "@/store";

export default defineComponent({
  name: "addBook",
  components: { IonPage, IonToast },
  setup() {
    return {
      cover_img: require("../img/book1.jpg"),
      price: ref(1),
      num: ref(1),
      freight: ref(1),
      book_name: ref(""),
      introduction: ref(""),
      isOpenRef: ref(false),
      toastMessage: ref(""),
      upload_pic: ref(""),
      isCoverUploaded: ref(false),
    };
  },
  methods: {
    dataURLtoBlob(dataurl: string) {
      var arr = dataurl.split(","); //分割为数组，分割到第一个逗号
      let mime = arr[0].match(/:(.*?);/)![1].replace(/\.vue$/, ""); //获取分割后的base64前缀中的类型
      let bstr = window.atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },

    async getpic(source: any) {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: source,
        webUseInput: true,
      });

      var dataUrl = image.dataUrl;
      console.log(dataUrl);
      if (typeof dataUrl == "string") {
        document.getElementById("cover")?.setAttribute("src", dataUrl);
        this.upload_pic = dataUrl;
        this.isCoverUploaded = true;
      }
    },
    priceChange() {
      if (this.price % 1 != 0) {
        this.toastMessage = "价格只能为整数";
        this.setOpen(true);
        this.num = 1;
      } else if (this.price > 9999 || this.price < 1) {
        this.toastMessage = "价格区间为1~9999";
        this.setOpen(true);
        this.price = 1;
      }
    },
    setOpen(state: boolean) {
      this.isOpenRef = state;
    },
    numChange() {
      if (this.num % 1 != 0) {
        this.toastMessage = "数目只能为整数";
        this.setOpen(true);
        this.num = 1;
      } else if (this.num > 9999 || this.num < 1) {
        this.toastMessage = "数目区间为1~9999";
        this.setOpen(true);
        this.num = 1;
      }
      console.log(this.num);
    },
    freightChange() {
      if (this.freight % 1 != 0) {
        this.toastMessage = "数目只能为整数";
        this.setOpen(true);
        this.freight = 1;
      } else if (this.freight > 9999 || this.freight < 1) {
        this.toastMessage = "数目区间为1~9999";
        this.setOpen(true);
        this.freight = 1;
      }
      console.log(this.freight);
    },
    submit() {
      var that = this;
      var userInfo = data.userData;
      if (this.book_name == "") {
        this.toastMessage = "图书名不能为空";
        this.setOpen(true);
      } else if (this.introduction == "") {
        this.toastMessage = "简介不能为空";
        this.setOpen(true);
      } else if (!this.isCoverUploaded) {
        this.toastMessage = "请上传图片";
        this.setOpen(true);
      } else {
        var file = this.dataURLtoBlob(this.upload_pic);
        var cos = new COS({
          SecretId: "AKIDhEXbPyLUQ8btxmQr32qX1ITSEnALK8lE",
          SecretKey: "KQHsELCoBKDrGRM2TfcJkwwjHaeT2MQF",
        });
        var filekey = String(new Date().valueOf());

        cos.putObject(
          {
            Bucket: "bookstore-1306889748" /* 填入您自己的存储桶，必须字段 */,
            Region: "ap-nanjing" /* 存储桶所在地域，例如ap-beijing，必须字段 */,
            Key:
              "cover/" +
              filekey +
              ".png" /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
            Body: file,
          },
          function (err, data) {
            if (err) {
              //此时停止进一步操作
              that.toastMessage = err.message;
              that.setOpen(true);
            } else {
              var book_img = "https://" + data.Location;
              var book_name = that.book_name;
              var book_freight = that.freight;
              var book_price = that.price;
              var book_introduction = that.introduction;
              var book_num = that.num;
              var user_id = userInfo.user_id;
              //console.log(that);
              //步骤一:创建异步对象
              var ajax = new XMLHttpRequest();
              //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
              var url =
                "http://42.192.250.118:9000/bookstore/bookmanagement/addbook";
              url += "?book_img=" + book_img + "&book_name=" + book_name;
              url +=
                "&book_freight=" +
                book_freight +
                "&book_price=" +
                book_price +
                "&book_introduction=" +
                book_introduction +
                "&book_num=" +
                book_num;
              url += "&user_id=" + user_id;
              ajax.open("get", url);
              console.log(url);
              //步骤三:发送请求
              ajax.send();
              //步骤四:注册事件 onreadystatechange 状态改变就会调用
              ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                  var result = JSON.parse(ajax.responseText);
                  if (result.message == "error") {
                    that.toastMessage = "添加失败";
                    that.setOpen(true);
                  } else {
                    that.toastMessage = "添加成功";
                    that.setOpen(true);
                    that.$router.push({ path: "/bookManage" });
                  }
                }
              };
            }
          }
        );
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
.btn-upload {
  width: 20vw;
  height: 3vh;
  background-color: green;
  margin-left: 20vw;
  margin-bottom: 3vh;
}

.cover {
  width: 60vw;
  height: fit-content;
  margin: 2vh 20vw;
  border: solid 1px black;
}

.container {
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: white;
}

.info-zone {
  width: 80vw;
  height: fit-content;
  margin-left: 10vw;
  display: grid;
  grid-template-columns: 25vw 55vw;
  grid-template-rows: 10vh 10vh 10vh 10vh 10vh;
  vertical-align: top;
  background-color: white;
}

.info-zone p {
  display: inline-block;
  line-height: 10vh;
  color: black;
}

.info-zone input {
  width: 55vw;
  height: 5vh;
  margin-top: 2.5vh;
  border: 0;
  color: black;
  background-color: white;
}

.info-zone textarea {
  width: 54vw;
  height: 8vh;
  margin-top: 1vh;
  color: black;
  background-color: white;
}

.btn-submit {
  width: 50vw;
  height: 5vh;
  margin-left: 25vw;
  margin-bottom: 2vh;
  margin-top: 5vh;
  background-color: green;
}
</style>
