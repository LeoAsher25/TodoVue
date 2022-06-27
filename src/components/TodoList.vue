<script setup lang="ts">
import { TodoInjectionKeys, type ITodo } from "@/types";
import { inject, type Ref } from "vue";
import TodoItem from "./TodoItem.vue";

const todoList = inject<Ref<ITodo[]>>(TodoInjectionKeys.TodoList);
</script>

<template>
  <div class="todo-list">
    <h1>Todo List</h1>
    <TodoItem v-for="(todo, index) in todoList" :todo="todo" :key="index" />
  </div>
</template>

<style>
.todo-list {
  margin: auto;
  box-shadow: 2px 2px 20px 10px #0001;
  width: 500px;
  padding: 24px;
  border-radius: 5px;
}
</style>
