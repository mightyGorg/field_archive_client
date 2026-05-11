import { writable } from 'svelte/store'
import { AudioPlayer } from '$lib'

export const audioPlayer = writable<AudioPlayer | null>(null)
export const isAudioPlaying = writable<boolean>(false)

export async function initialiseAudioPlayer() {
	console.log('initialising audio...')
	const player = new AudioPlayer()
	audioPlayer.set(player)
}
