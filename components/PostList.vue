<template>
  <div class="post_list">
    <div v-for="(item, index) in post_items" :key="index" class="post_item">
      <div class="post_header">
        <h2 class="user_name">{{ item.user.name }}</h2>
        <button class="likes_btn" @click="toggleLikesNum(item)">
          <img src="~/assets/imgs/heart.png" width="30px" height="auto" />
        </button>
        <p class="likes_num">{{ item.likes_count }}</p>
        <button class="post_delete_btn" @click="deletePost(item, index)">
          <img src="~/assets/imgs/cross.png" width="30px" height="auto" />
        </button>
        <button class="post_delete_btn" @click="showComment(item)">
          <img src="~/assets/imgs/detail.png" width="30px" height="auto" />
        </button>
      </div>
      <p class="post_content">{{ item.post }}</p>
    </div>
  </div>
</template>

<script>
import common from '@/plugins/common'
export default {
  props: {
    post_items: {
      type: Array,
      required: true
    }
  },
  methods: {
    async deletePost(post, index) {
      const result = await common.deletePost(
        this.$auth.user.id,
        post.user_id,
        post.id
      );
      if (result) {
        this.post_items.splice(index, 1);
      }
    },
    async toggleLikesNum(post) {
      const results = await common.toggleLikesNum(
        this.$auth.user.id,
        post.user_id,
        post.id
      );

      if (!results.result) return;
      if (results.like) {
        post.likes_count++;
      } else {
        post.likes_count--;
      }
    },
    async showComment(post) {
      this.$router.push({
        path: `/comments/posts/${post.id}`,
        query: { post: post }
      })
    },
  }
}
</script>

<style scoped>
.side {
  width: 15%;
  min-height: 100vh;
  background-color: #1d50a2;
  color: #eee;
  padding: 20px;
}

.side_wrapper {
  margin-bottom: 40px;
}

.nav_item {
  list-style: none;
  margin-top: 15px;
  align-items: center;
}

.nav_item:first-of-type {
  margin-top: 0
}

.img {
  display: inline-block;
}

.logout_item {
  display: flex;
  align-items: center;
}

.post_textarea {
  width: 100%;
  height: 250px;
  margin-top: 10px;
  resize: none;
  background-color: #eee;
  font-size: 16px;
  padding: 10px;
  display: inline-block;
  box-sizing: border-box;
}

.logout_btn {
  border: 1px solid #1d50a2;
  background-color: #1d50a2;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  text-align: left;
  padding: 0;
  font-weight: bold;
}
</style>