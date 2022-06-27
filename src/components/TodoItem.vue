<script setup lang="ts">
import { TodoInjectionKeys, type ITodo, type ITodoAction } from "@/types";
import { inject, type Ref } from "vue";

const props = defineProps<{
  todo: ITodo;
}>();

const todoActions = inject<ITodoAction>(TodoInjectionKeys.todoActions);
const IsCreate = inject(TodoInjectionKeys.IsCreate);
const currentTodo = inject(TodoInjectionKeys.CurrentTodo);

const handleDeleteClick = () => {
  // props.handleDelete(props.todo);
  todoActions?.handleDeleteTodo(props.todo);
};

const handleEditClick = () => {
  IsCreate?.update(false);
  currentTodo?.update(props.todo);
};
</script>

<template>
  <div class="todo-item">
    <input type="checkbox" name="isDone" :id="'status-checkbox-' + todo.id" />
    <label :for="'status-checkbox-' + todo.id">
      <span class="title">
        {{ todo.title }}
      </span>

      <span class="deadline">
        {{
          `${new Date(todo.deadline)?.getHours()}:${new Date(
            todo.deadline
          )?.getMinutes()}:${new Date(todo.deadline)?.getSeconds()} ${new Date(
            todo.deadline
          )?.getDate()}/${new Date(todo.deadline)?.getMonth()}/${new Date(
            todo.deadline
          )?.getFullYear()}`
        }}
      </span>
    </label>
    <div class="btn-wrap">
      <button @click="handleDeleteClick">Delete</button>
      <button @click="handleEditClick">Edit</button>
    </div>
  </div>
</template>

<style>
.todo-item {
  display: flex;
  align-items: center;
  margin: 12px 0;
}

label[for="status-checkbox"] {
  font-size: 18px;
}

.todo-item .title {
  margin: 0 10px;
  user-select: none;
}

.todo-item .deadline {
  opacity: 0.7;
  user-select: none;
}

.todo-item .title {
  font-weight: 600;
}

.btn-wrap {
  display: flex;
  align-items: center;
}
</style>
