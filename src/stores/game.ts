import { writable } from 'svelte/store';

export const currentWord = writable<string>("");
export const currentIndex = writable<number>(0);
export const attemptedWords = writable<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
]);
export const targetWord = writable<string>("HEART")