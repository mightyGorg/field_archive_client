import { writable } from "svelte/store";

export const isFading = writable<boolean>(false)
export const isStarted = writable<boolean>(false)
export const navigating = writable<boolean>(false)
export const initialFade = writable<boolean>(false)
export const isCanvas = writable<boolean>(true)

