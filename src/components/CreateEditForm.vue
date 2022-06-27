<script setup lang="ts">
import { inject, ref, watch } from "vue";
import {
  ETodoStatus,
  TodoInjectionKeys,
  type ITodo,
  type ITodoAction,
} from "../types/index";

const currentTodo = inject(TodoInjectionKeys.CurrentTodo);
const todoActions = inject<ITodoAction>(TodoInjectionKeys.todoActions);
const IsCreate = inject(TodoInjectionKeys.IsCreate);

const data = ref<ITodo>(
  IsCreate?.value
    ? {
        id: "",
        title: "",
        deadline: "",
        status: ETodoStatus.TODO,
      }
    : (currentTodo?.value.value as ITodo)
);

watch(
  [() => currentTodo?.value.value, () => IsCreate?.value.value],
  ([newCurrentTodo, newIsCreate]) => {
    data.value = newCurrentTodo as ITodo;
  }
);

const handleSubmit = () => {
  if (IsCreate?.value.value) {
    const newTodo: ITodo = {
      id: Date.now().toString(),
      title: data.value.title!,
      deadline: data.value.deadline!,
      status: ETodoStatus.TODO,
    };
    todoActions?.handleAddTodo(newTodo);
    console.log("deadline: ", newTodo.deadline);
  } else {
    const newTodo: ITodo = {
      id: currentTodo?.value.value.id!,
      title: data.value.title!,
      deadline: data.value.deadline!,
      status: currentTodo?.value.value.status!,
    };
    console.log("test: ", newTodo, currentTodo?.value.value);
    todoActions?.handleEditTodo(newTodo);
    IsCreate?.update(true);
  }
};
</script>

<template>
  <div class="create-edit-form">
    <h1>
      {{
        IsCreate?.value.value
          ? "Create new todo"
          : "Edit todo: " + currentTodo?.value.value.title
      }}
    </h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-gr">
        <label for="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          v-model.lazy.trim="data.title"
        />
      </div>

      <div class="form-gr">
        <label for="deadline">Deadline</label>
        <input
          type="datetime-local"
          name="deadline"
          v-model="data.deadline"
          id="deadline"
        />
      </div>

      <div class="form-gr">
        <button type="submit" class="submit-form">
          {{ IsCreate?.value.value ? "Create" : "Save" }}
        </button>
      </div>
    </form>
  </div>
</template>

<style>
.create-edit-form {
  padding: 20px;
  box-shadow: 2px 2px 20px 6px #0001;
  border-radius: 10px;
  width: 500px;
  margin: 50px auto;
}

.form-gr {
  display: flex;
  flex-direction: column;
  margin: 12px;
}

.form-gr * {
  font-size: 18px;
}

label {
  font-weight: 600;
}

input {
  padding: 8px 20px;
  border-radius: 5px;
  border-color: #9994;
}

.submit-form {
  padding: 8px 16px;
  border-color: #9994;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
