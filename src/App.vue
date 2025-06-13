<template>
  <div id="app">
    <nav>
      <router-link to="/">ホーム</router-link> |
      <router-link to="/add">記録追加</router-link> |
      <router-link to="/edit">記録編集</router-link> |
      <router-link to="/delete">記録削除</router-link> |
      <router-link to="/view">記録一覧</router-link> |
      <router-link to="/graph">グラフ</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
nav {
  background-color: #f4f4f4;
  padding: 1rem;
  margin-bottom: 1rem;
}
nav a {
  margin-right: 10px;
  text-decoration: none;
  color: #333;
}
nav a.router-link-active {
  font-weight: bold;
  color: #42b983;
}
</style>