<template>
  <div class="card-container" @click="toDetail">
    <div class="card-border-in">
      <img :src="props.bookInfo.book_img" class="bookCover" />
      <div class="bookInfo">
        <div class="book-title">
          <p class="book-title-text">
            {{ props.bookInfo.book_name }}
          </p>
        </div>
        <p class="book-price">￥{{ props.bookInfo.book_price }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "bookCard",
  props: ["bookInfo"],
  setup(props) {
    return { props };
  },
  components: {},
  methods: {
    toDetail: function () {
      var id = this.props.bookInfo.book_id;
      this.$router.push({
        path: "/bookDetail",
        query: {
          id: id,
        },
      });
    },
  },
});
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.card-container {
  width: 50vw;
  height: 75vw;
  padding: 1.5vw 2.5vw;
  display: inline-block;
}

.card-border-in {
  width: 45vw;
  height: 72vw;
  background-color: white;
  border-radius: 3vw;
}

.bookCover {
  width: 100%;
  height: 60%;
  border-top-left-radius: 3vw;
  border-top-right-radius: 3vw;
}

.bookInfo {
  width: 100%;
  height: 40%;
  border-bottom-left-radius: 3vw;
  border-bottom-right-radius: 3vw;
}
.book-title {
  width: 100%;
  height: 60%;
}
.book-title-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: 15px;
  color: black;
  width: 90%;
  margin-left: 5%;
}
.book-price {
  width: 90%;
  height: 20%;
  margin-left: 5%;
  color: red;
  font-weight: bold;
}
</style>
