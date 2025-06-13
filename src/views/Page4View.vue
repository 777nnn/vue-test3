<template>
  <div class="p-4 max-w-2xl mx-auto">
    <h1 class="text-xl font-bold mb-4">体重記録一覧</h1>

    <div v-if="records.length === 0" class="text-gray-500">記録がまだありません。</div>

    <div v-else class="space-y-4">
      <div
        v-for="record in sortedRecords"
        :key="record.id"
        class="p-4 border rounded shadow-sm bg-white"
      >
        <p><strong>日付:</strong> {{ record.date }}</p>
        <p><strong>体重:</strong> {{ record.weight }} kg</p>
        <p><strong>メモ:</strong> {{ record.memo || 'なし' }}</p>
        <div class="mt-2 space-x-2">
          <router-link :to="`/edit/${record.id}`" class="text-blue-500 hover:underline">編集</router-link>
          <router-link :to="`/delete/${record.id}`" class="text-red-500 hover:underline">削除</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from 'firebase/firestore';

export default {
  data() {
    return {
      records: []
    };
  },
  computed: {
    sortedRecords() {
      return this.records.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  async mounted() {
    const colRef = collection(this.$db, 'dietRecords');
    const snapshot = await getDocs(colRef);
    this.records = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};
</script>