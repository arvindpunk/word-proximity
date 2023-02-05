import { CONFIG_KEY, CONFIG_VERSION } from "$utils/constants";

import { Preferences } from "@capacitor/preferences";
import { writable, get } from 'svelte/store';

export const currentWord = writable<string>("");
export const currentIndex = writable<number>(0);
export const attemptedWords = writable<string[]>(["", "", "", "", "", "",]);
export const targetWord = writable<string>("HEART")
export const isSolved = writable<boolean>(false);

export interface Config {
    currentWord: string;
    currentIndex: number;
    attemptedWords: string[];
    targetWord: string;
    isSolved: boolean;
    version: number;
}

// ConfigV1
export const DEFAULT_CONFIG: Config = {
    currentWord: "",
    currentIndex: 0,
    attemptedWords: ["", "", "", "", "", ""],
    targetWord: "HEART",
    isSolved: false,
    version: CONFIG_VERSION
}

export const set = (config: Config) => {
    currentWord.set(config.currentWord);
    currentIndex.set(config.currentIndex);
    targetWord.set(config.targetWord);
    attemptedWords.set(config.attemptedWords);
    isSolved.set(config.isSolved)
}

export const loadFromPreferences = async () => {
    const pref = await Preferences.get({ key: CONFIG_KEY });
    console.log(pref.value);
    if (pref.value) {
        const config: Config = JSON.parse(pref.value);
        console.log(config);
        set(config);
    }
    set(DEFAULT_CONFIG);
}

export const saveToPreferences = async () => {
    const updatedConfig: Config = {
        currentWord: get(currentWord),
        currentIndex: get(currentIndex),
        targetWord: get(targetWord),
        attemptedWords: get(attemptedWords),
        version: CONFIG_VERSION,
        isSolved: get(isSolved),
    }
    await Preferences.set({ key: CONFIG_KEY, value: JSON.stringify(updatedConfig) });
}