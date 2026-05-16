import { writable } from 'svelte/store'
import { AudioPlayer } from '$lib'
import type { Track } from '../types/track'

export const audioPlayer = writable<AudioPlayer | null>(null)
export const isAudioPlaying = writable<boolean>(false)
export const currentRecording = writable<Track | null>(null)

export async function initialiseAudioPlayer() {
	console.log('initialising audio...')
	const player = new AudioPlayer()
	audioPlayer.set(player)
}
