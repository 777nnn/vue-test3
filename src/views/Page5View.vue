<template>
  <div class="p-4 max-w-2xl mx-auto">
    <h1 class="text-xl font-bold mb-4">体重の推移グラフ</h1>

    <div v-if="chartData">
      <Line :data="chartData" :options="chartOptions" />
    </div>
    <div v-else class="text-gray-500">データを読み込み中...</div>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';
import { collection, getDocs } from 'firebase/firestore';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default {
  components: {
    Line
  },
  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true
          },
          title: {
            display: true,
            text: '体重の推移'
          }
        }
      }
    };
  },
  async mounted() {
    const colRef = collection(this.$db, 'dietRecords');
    const snapshot = await getDocs(colRef);
    const records = snapshot.docs.map(doc => doc.data());

    const sorted = records
      .filter(r => r.date && r.weight)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    this.chartData = {
      labels: sorted.map(r => r.date),
      datasets: [
        {
          label: '体重 (kg)',
          data: sorted.map(r => r.weight),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.2
        }
      ]
    };
  }
};
</script>

<style scoped>
div {
  height: 400px;
}
</style>