<template>
  <div class="header">
    <div class="header__wrapper">
      <h1 class="app__ttl">
        <NuxtLink to="/">SHARE</NuxtLink>
      </h1>
      <div class="loggedin_user_name">{{ $auth.user.name }}</div>
    </div>
  </div>
</template>

<style scoped>
.loggedin_user_name {
  font-weight: bold;
}
</style>
