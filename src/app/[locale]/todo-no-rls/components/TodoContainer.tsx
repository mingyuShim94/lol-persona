"use client";

import { getTodos, getTodoById, getTodosBySearch } from "@/apis/todos-no-rls";
import React, { useEffect } from "react";

const TodoContainer = () => {
  useEffect(() => {
    getTodosBySearch("add");
  }, []);
  return <div>TodoContainer</div>;
};

export default TodoContainer;
