<script setup lang="ts">
import { provide, ref, watch, type Ref } from "vue";
import CreateEditForm from "./components/CreateEditForm.vue";
import TodoList from "./components/TodoList.vue";
import { ETodoStatus, TodoInjectionKeys, type ITodo } from "./types";

const todoList = ref<ITodo[]>([
  {
    id: "1",
    title: "Todo 1",
    deadline: "2022-06-12T15:15:00",
    status: ETodoStatus.TODO,
  },
  {
    id: "2",
    title: "Todo 2",
    deadline: "2022-06-12T10:10:00",
    status: ETodoStatus.DONE,
  },
  {
    id: "3",
    title: "Todo 3",
    deadline: "2022-06-10T10:10:00",
    status: ETodoStatus.TODO,
  },
]);

const handleAddTodo = (todo: any) => {
  todoList.value.unshift(todo);
  currentTodo.value = {
    id: "",
    deadline: "",
    title: "",
    status: ETodoStatus.TODO,
  };
};

const handleDeleteTodo = (todo: ITodo) => {
  todoList.value = todoList.value.filter((item) => item.id !== todo.id);
};

const handleEditTodo = (todo: ITodo) => {
  const index = todoList.value.findIndex((item) => item.id === todo.id);
  if (index >= 0) {
    todoList.value.splice(index, 1, todo);
  }
  isCreate.value = true;
  currentTodo.value = {
    id: "",
    deadline: "",
    title: "",
    status: ETodoStatus.TODO,
  };
};

const currentTodo: Ref<ITodo> = ref({
  id: "",
  title: "",
  deadline: "",
  status: ETodoStatus.TODO,
});

const updateCurrentTodo = (newValue: ITodo) => {
  currentTodo.value = newValue;
};

watch(todoList, (newList, oldList) => {
  console.log("new List: ", newList);
  console.log("old List: ", oldList);
});

const isCreate = ref(true);

provide(TodoInjectionKeys.TodoList, todoList);
provide(TodoInjectionKeys.CurrentTodo, {
  value: currentTodo,
  update: updateCurrentTodo,
});

provide(TodoInjectionKeys.IsCreate, {
  value: isCreate,
  update: (newValue: boolean) => (isCreate.value = newValue),
});

provide(TodoInjectionKeys.todoActions, {
  handleAddTodo,
  handleDeleteTodo,
  handleEditTodo,
});
</script>

<template>
  <CreateEditForm />
  <TodoList />
</template>

<style>
@import "./assets/base.css";

#app {
  min-height: 100vh;
}
</style>
