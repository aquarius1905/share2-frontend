<template>
  <div class="side">
    <div class="side_wrapper">
      <nav>
        <ul class="nav_wrapper">
          <li class="nav_item">
            <img src="~/assets/imgs/home.png" class="img" width="20" height="19"/>
            <NuxtLink to="/" class="link">ホーム</NuxtLink>
          </li>
          <li class="nav_item logout_item">
            <button @click="logout" class="logout_btn">
              <img src="~/assets/imgs/logout.png" class="img" width="19" height="20"/>
              ログアウト
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <validation-observer ref="obs" tag="div" v-slot="ObserverProps">
      <validation-provider rules="required|max:120" v-slot="{ errors }">
        <label for="post_textarea">投稿</label>
        <br />
        <textarea v-model="post_textarea" class="post_textarea" name="投稿"></textarea>
        <div class="error">{{ errors[0] }}</div>
        <button type="button" class="post_btn" @click="addPost" :disabled="ObserverProps.invalid || !ObserverProps.validated">
          投稿する
        </button>
      </validation-provider>
    </validation-observer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post_textarea: null,
    };
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
      }
    },
    async addPost() {
      const sendData = {
        user_id: this.$auth.user.id,
        post: this.post_textarea,
      };

      try {
        const { data } = await this.$axios.post("/api/posts", sendData);
        this.$emit('addPostItem', data.data);
        this.post_textarea = null;
      } catch (error) {
        console.error(error)
      }
    }
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