<template>
  <div class="input_wrapper">
      <h1 class="ttl">新規登録</h1>
      <div class="input_form">
        <input 
          v-model="name" 
          type="text" 
          placeholder="ユーザーネーム" 
          class="input" 
          required maxlength="20"
        />
        <br/>
        <input 
          v-model="email"
          type="email" 
          placeholder="メールアドレス" 
          class="input" 
          required
        />
        <br/>
        <input 
          v-model="password" 
          type="password" 
          placeholder="パスワード" 
          class="input" 
          required
        />
        <br/>
        <button @click="register" class="btn">新規登録</button>
      </div>
      </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      name: null,
      email: null,
      password: null,
    };
  },
  methods: {
    async register() {
      try {
        await this.$axios.post("/api/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.$router.push("/login");
      } catch {
        alert("メールアドレスがすでに登録されています");
      }
    },
  },
};
</script>