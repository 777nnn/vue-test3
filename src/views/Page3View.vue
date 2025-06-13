<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-xl font-bold mb-4">記録の削除</h1>
    <p class="mb-4">以下の記録を削除しますか？</p>

    <div v-if="record" class="border p-4 rounded bg-gray-100">
      <p><strong>日付:</strong> {{ record.date }}</p>
      <p><strong>体重:</strong> {{ record.weight }} kg</p>
      <p><strong>メモ:</strong> {{ record.memo || 'なし' }}</p>
    </div>

    <div class="mt-4 space-x-2">
      <button @click="deleteRecord" class="bg-red-500 text-white px-4 py-2 rounded">削除する</button>
      <button @click="$router.push('/records')" class="bg-gray-300 px-4 py-2 rounded">キャンセル</button>
    </div>
  </div>
</template>

<script>
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      record: null
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const docRef = doc(this.$db, 'dietRecords', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.record = docSnap.data();
    } else {
      alert('記録が見つかりません');
      this.$router.push('/records');
    }
  },
  methods: {
    async deleteRecord() {
      const id = this.$route.params.id;
      const docRef = doc(this.$db, 'dietRecords', id);
      await deleteDoc(docRef);
      this.$router.push('/records');
    }
  }
};
</script>