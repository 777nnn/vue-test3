<template>
  <div class="p-4 max-w-xl mx-auto">
    <h1 class="text-xl font-bold mb-4">体重記録を編集</h1>
    <form @submit.prevent="updateRecord" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">日付</label>
        <input v-model="date" type="date" class="border p-2 w-full rounded" required />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">体重 (kg)</label>
        <input v-model="weight" type="number" step="0.1" class="border p-2 w-full rounded" required />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">メモ（任意）</label>
        <textarea v-model="memo" class="border p-2 w-full rounded"></textarea>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">更新</button>
    </form>
  </div>
</template>

<script>
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      date: '',
      weight: '',
      memo: ''
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const docRef = doc(this.$db, 'dietRecords', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      this.date = data.date;
      this.weight = data.weight;
      this.memo = data.memo || '';
    } else {
      alert('記録が見つかりません');
      this.$router.push('/');
    }
  },
  methods: {
    async updateRecord() {
      const id = this.$route.params.id;
      const docRef = doc(this.$db, 'dietRecords', id);
      await updateDoc(docRef, {
        date: this.date,
        weight: this.weight,
        memo: this.memo
      });
      this.$router.push('/records');
    }
  }
};
</script>