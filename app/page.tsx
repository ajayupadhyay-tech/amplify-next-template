"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
Amplify.configure(outputs);

// In-memory mock database to allow local testing without AWS deployment
let mockTodos = [
  { id: "1", content: "Hello from local mock data! (No AWS deployment needed)" }
];
const listeners = new Set<(data: { items: typeof mockTodos }) => void>();

const notify = () => {
  const data = { items: [...mockTodos] };
  listeners.forEach(listener => listener(data));
};

const mockClient = {
  models: {
    Todo: {
      observeQuery: () => ({
        subscribe: (callbacks: { next: (data: { items: typeof mockTodos }) => void }) => {
          listeners.add(callbacks.next);
          // Emit initial data asynchronously to match Amplify behavior
          setTimeout(() => callbacks.next({ items: [...mockTodos] }), 0);
          return {
            unsubscribe: () => {
              listeners.delete(callbacks.next);
            }
          };
        }
      }),
      create: async (input: { content: string }) => {
        const newTodo = {
          id: Math.random().toString(36).substring(2),
          content: input.content,
        };
        mockTodos.push(newTodo);
        notify();
        return newTodo;
      },
      delete: async (input: { id: string }) => {
        mockTodos = mockTodos.filter(t => t.id !== input.id);
        notify();
        return {};
      }
    }
  }
};

const client = outputs.data.url.includes("example.com")
  ? (mockClient as any)
  : generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  const { signOut: realSignOut } = useAuthenticator();
  const signOut = outputs.data?.url?.includes("example.com")
    ? () => { localStorage.removeItem("mock_logged_in"); window.location.reload(); }
    : realSignOut;
  useEffect(() => {
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: (data) => {
        setTodos([...data.items]);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  async function createTodo() {
    const content = window.prompt("Todo content");

    if (!content) return;

    await client.models.Todo.create({
      content,
    });
  }

  async function deleteTodo(id: string) {
    await client.models.Todo.delete({ id });
  }

  return (
    <main>
      <h1>My Todos</h1>

      <button onClick={createTodo}>+ New Todo</button>
      <button onClick={signOut}>Sign out</button>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => deleteTodo(todo.id)}
            style={{ cursor: "pointer" }}
          >
            {todo.content}
          </li>
        ))}
      </ul>

      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />

        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial
        </a>
      </div>
    </main>
  );
}