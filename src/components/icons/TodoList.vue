<template>
  <div>
    <h1>ToDoリスト</h1>
    <input v-model="newTodo" placeholder="やることを入力" />
    <button @click="addTodo">追加</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>
    </ul>
  </div>
</template>

<script>
import { db } from '../firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'

export default {
  data() {
    return {
      newTodo: '',
      todos: [],
    }
  },
  async mounted() {
    const querySnapshot = await getDocs(collection(db, "todos"))
    this.todos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  },
  methods: {
    async addTodo() {
      if (!this.newTodo) return
      await addDoc(collection(db, "todos"), {
        text: this.newTodo
      })
      this.newTodo = ''
      location.reload() // シンプルに読み直し
    }
  }
}
</script>
