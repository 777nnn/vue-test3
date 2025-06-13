<template>
  <div class="p-4 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">ダイエット記録アプリへようこそ！</h1>

    <p class="mb-4">
      ここでは毎日の体重を記録して、体重の推移を管理できます。
      新しい記録を追加したり、過去の記録を編集・削除したりできます。
    </p>

    <router-link
      to="/page1"
      class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      体重記録一覧へ
    </router-link>

    <router-link
      to="/add"
      class="inline-block ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      新しい記録を追加
    </router-link>

    <router-link
      to="/page5"
      class="inline-block ml-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
    >
      体重推移グラフを見る
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
};
</script>

<style scoped>
</style>