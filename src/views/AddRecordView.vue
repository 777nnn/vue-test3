<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-xl font-bold mb-4">体重を記録する</h1>
    <form @submit.prevent="addRecord">
      <div class="mb-4">
        <label class="block mb-1">日付</label>
        <input type="date" v-model="date" required class="w-full border p-2 rounded" />
      </div>
      <div class="mb-4">
        <label class="block mb-1">体重 (kg)</label>
        <input type="number" v-model="weight" step="0.1" required class="w-full border p-2 rounded" />
      </div>
      <div class="mb-4">
        <label class="block mb-1">メモ（任意）</label>
        <textarea v-model="memo" class="w-full border p-2 rounded" rows="3"></textarea>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">記録する</button>
    </form>
  </div>
</template>

<script>
import { collection, addDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      date: '',
      weight: '',
      memo: ''
    };
  },
  methods: {
    async addRecord() {
      try {
        await addDoc(collection(this.$db, 'dietRecords'), {
          date: this.date,
          weight: parseFloat(this.weight),
          memo: this.memo,
          createdAt: new Date()
        });
        alert('記録が追加されました！');
        this.$router.push('/');
      } catch (error) {
        console.error('追加エラー:', error);
        alert('記録の追加に失敗しました');
      }
    }
  }
};
</script>