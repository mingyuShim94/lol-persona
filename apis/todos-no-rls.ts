"use clinet";

import { createSupabaseBrowserClient } from "@/lib/client/supabase";

//todoList 가져오기
export const getTodos = async () => {
  const supabase = createSupabaseBrowserClient();
  const result = await supabase
    .from("todos_no_rls")
    .select("*")
    .is("deleted_at", null)
    .order("id", { ascending: true });

  return result.data;
};

//todoList 가져오기 + by Id
export const getTodoById = async (id: number) => {
  const supabase = createSupabaseBrowserClient();
  const result = await supabase
    .from("todos_no_rls")
    .select("*")
    .is("deleted_at", null)
    .eq("id", id);
  return result.data;
};

//todoList 가져오기 + search
export const getTodosBySearch = async (search: string) => {
  const supabase = createSupabaseBrowserClient();
  const result = await supabase
    .from("todos_no_rls")
    .select("*")
    .is("deleted_at", null)
    .ilike("content", `%${search}%`)
    .order("id", { ascending: false })
    .limit(500);
  return result.data;
};
