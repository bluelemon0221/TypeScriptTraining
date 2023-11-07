import { resolve } from "path";
import { Article } from "./types";
import { notFound } from "next/navigation";

export const getAllArticles = async (): Promise<Article[]> => {
  const res = await fetch(`http://localhost:3001/posts`, { cache: "no-store" }); //SSR

  if (!res.ok) {
    throw new Error("エラーが発生しました");
  }

  //   await new Promise((resolve) => setTimeout(resolve, 500));

  const articles = await res.json();
  return articles;
};

export const getDetailArticle = async (id: string): Promise<Article> => {
  const res = await fetch(`http://localhost:3001/posts/${id}`, {
    next: { revalidate: 1 },
  }); //SSR
  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("エラーが発生しました");
  }

  //   await new Promise((resolve) => setTimeout(resolve, 1000));

  const articles = await res.json();
  return articles;
};

export const createArticle = async (
  id: string,
  title: string,
  content: string
): Promise<Article> => {
  const currentDatetime = new Date().toISOString();

  const res = await fetch(`http://localhost:3001/posts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, title, content, createdAt: currentDatetime }),
  }); //SSR

  if (!res.ok) {
    throw new Error("エラーが発生しました");
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newArticles = await res.json();
  return newArticles;
};

export const deleteArticle = async (id: string): Promise<Article> => {
  const res = await fetch(`http://localhost:3001/posts/${id}`, {
    method: "DELETE",
  }); //SSR

  if (!res.ok) {
    throw new Error("エラーが発生しました");
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const deleteArticles = await res.json();
  return deleteArticles;
};
