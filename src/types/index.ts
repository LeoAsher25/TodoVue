import type { InjectionKey, Ref } from "vue";

export interface ITodo {
  id: string;
  title: string;
  deadline: string;
  status: ETodoStatus;
}

export enum ETodoStatus {
  TODO = "Todo",
  DONE = "Done",
}

export const TodoInjectionKeys = {
  TodoList: Symbol() as InjectionKey<Ref<ITodo[]>>,
  CurrentTodo: Symbol() as InjectionKey<{
    value: Ref<ITodo>;
    update: (newValue: ITodo) => void;
  }>,
  IsCreate: Symbol() as InjectionKey<{
    value: Ref<boolean>;
    update: (newValue: boolean) => void;
  }>,
  todoActions: Symbol() as InjectionKey<ITodoAction>,
};

export interface ITodoAction {
  handleAddTodo: (todo: ITodo) => void;
  handleDeleteTodo: (todo: ITodo) => void;
  handleEditTodo: (todo: ITodo) => void;
}
