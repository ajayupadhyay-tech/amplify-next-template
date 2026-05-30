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
  { id: "1", content: "Hello from local mock data! (No AWS deployment needed)", isDone: false }
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
      create: async (input: { content: string; isDone?: boolean }) => {
        const newTodo = {
          id: Math.random().toString(36).substring(2),
          content: input.content,
          isDone: input.isDone ?? false,
        };
        mockTodos.push(newTodo);
        notify();
        return newTodo;
      },
      update: async (input: { id: string; isDone?: boolean; content?: string }) => {
        mockTodos = mockTodos.map(t => 
          t.id === input.id 
            ? { 
                ...t, 
                isDone: input.isDone !== undefined ? input.isDone : t.isDone,
                content: input.content !== undefined ? input.content : t.content 
              } 
            : t
        );
        notify();
        return {};
      },
      delete: async (input: { id: string }) => {
        mockTodos = mockTodos.filter(t => t.id !== input.id);
        notify();
        return {};
      }
    }
  }
};

const isMockEnv = outputs.data?.url?.includes("example.com") ?? true;

const client = isMockEnv
  ? (mockClient as any)
  : generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  const { user, signOut: realSignOut } = useAuthenticator();
  const signOut = isMockEnv
    ? () => { localStorage.removeItem("mock_logged_in"); window.location.reload(); }
    : realSignOut;

  const userEmail = isMockEnv
    ? "mock-user@example.com"
    : user?.signInDetails?.loginId || user?.username || "Authenticated User";

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
      isDone: false
    });
  }

  async function toggleTodo(todo: Schema["Todo"]["type"]) {
    await client.models.Todo.update({
      id: todo.id,
      isDone: !todo.isDone
    });
  }

  async function deleteTodo(id: string) {
    await client.models.Todo.delete({ id });
  }

  return (
    <main>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h1>My Todos</h1>
        <div style={{ textAlign: "right", fontSize: "0.85rem", color: "#475569" }}>
          <span style={{ marginRight: "1rem" }}>{userEmail}</span>
          <button 
            onClick={signOut} 
            style={{ 
              padding: "0.4rem 0.8rem", 
              fontSize: "0.8rem",
              backgroundColor: "#ef4444",
              border: "none",
              borderRadius: "4px"
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      <button onClick={createTodo} style={{ marginBottom: "1rem" }}>+ New Todo</button>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              padding: "10px 15px",
              borderBottom: "1px solid #e2e8f0"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
              <input 
                type="checkbox" 
                checked={!!todo.isDone} 
                onChange={() => toggleTodo(todo)}
                style={{ cursor: "pointer", width: "16px", height: "16px" }}
              />
              <span style={{ 
                textDecoration: todo.isDone ? "line-through" : "none",
                color: todo.isDone ? "#94b5b8ff" : "#3f5d8eff",
                cursor: "pointer"
              }}
              onClick={() => toggleTodo(todo)}
              >
                {todo.content}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                background: "none",
                border: "none",
                color: "#ef4444",
                cursor: "pointer",
                padding: "4px 8px",
                fontSize: "1.1rem",
                fontWeight: "bold"
              }}
              title="Delete Todo"
            >
              ×
            </button>
          </li>
        ))}
        {todos.length === 0 && (
          <li style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>
            No todos yet. Create one!
          </li>
        )}
      </ul>

      <div style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "#64748b", textAlign: "center" }}>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a 
          href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#12b300ff", textDecoration: "underline" }}
        >
          Review next steps of this tutorial
        </a>
      </div>
    </main>
  );
}