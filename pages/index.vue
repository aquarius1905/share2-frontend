<template>
  <div class="post flex">
    <SideBar @addPostItem="addPostItem" />
    <div class="post_wrapper">
      <PostList :post_items="post_items"/>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'logged_in',
  data() {
    return {
      post_items: [],
    };
  },
  methods: {
    async getPosts() {
      this.post_items.splice(0);
      const { data } = await this.$axios.get("/api/posts");
      this.post_items = data.data;
    },
    addPostItem(item) {
      this.post_items.unshift(item);
    }
  },
  created() {
    this.getPosts();
  }
};
</script>