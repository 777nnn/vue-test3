<template>
  <div class="p-4 max-w-2xl mx-auto">
    <h1 class="text-xl font-bold mb-4">体重記録一覧</h1>
    <div v-if="records.length === 0">記録がありません。</div>
    <ul>
      <li
        v-for="record in sortedRecords"
        :key="record.id"
        class="border-b py-2 flex justify-between items-center"
      >
        <div>
          <div class="font-semibold">{{ formatDate(record.date) }}</div>
          <div>体重: {{ record.weight }}kg</div>
          <div v-if="record.memo" class="text-sm text-gray-600">メモ: {{ record.memo }}</div>
        </div>
        <div>
          <router-link :to="`/edit/${record.id}`" class="text-blue-500 hover:underline text-sm">編集</router-link>
        </div>
      </li>
    </ul>
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
    const snapshot = await getDocs(collection(this.$db, 'dietRecords'));
    this.records = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    }
  }
};
</script>