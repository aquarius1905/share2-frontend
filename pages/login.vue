<template>
  <div class="input_wrapper">
      <h1 class="ttl">ログイン</h1>
        <div class="input_form">
        <input v-model="email" type="text" placeholder="メールアドレス" class="input" required/>
        <br/>
        <input v-model="password" type="password" placeholder="パスワード" class="input" required/>
        <br/>
        <button @click="login" class="btn">ログイン</button>
      </div>
  </div>
</template>

<script>
import { localeChanged } from 'vee-validate';

export default {
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith("laravelJWT", {
          data: {
            email: this.email,
            password: this.password,
          },
        });
        this.$router.push("/");
      } catch {
        alert("メールアドレスまたはパスワードが間違っております");
      }
    },
  },
};
</script>