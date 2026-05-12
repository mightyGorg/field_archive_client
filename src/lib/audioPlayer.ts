import { AudioRepository } from './audioRepository'
import { AudioEngine } from './audioEngine'
import type { Track } from '../types/track'

export class AudioPlayer {
	private engine: AudioEngine | null = null
	public repo: AudioRepository
	private duration: number | null = null
	private timeoutId: number | null = null

	constructor() {
		this.repo = new AudioRepository()
	}

	async playNext(fadeIn: number = 3): Promise<void> {
		await this.loadAndPlay(fadeIn)
		if (this.duration) {
			this.scheduleNextTrack(fadeIn)
		}
	}

	private scheduleNextTrack(fadeIn: number): void {
		console.log(`scheduling next track...`)
		if (this.timeoutId) clearTimeout(this.timeoutId)
		this.timeoutId = setTimeout(
			() => {
				this.playNext(fadeIn).catch((err) => {
					console.error('Error in playNext: ', err)
				})
			},
			(this.duration ?? 0) * 1000
		)
	}

	private async loadAndPlay(fadeIn: number): Promise<void> {
		const response = await fetch(`/api/recordings/random`)
		if (!response.ok)
			throw new Error(`Error ${response.status} could not fetch`)

		const track: Track = await response.json()

		this.engine = new AudioEngine(track.audioLocation)
		this.duration = track.duration

		await this.engine.play(fadeIn, this.duration)
	}

	stop(): void {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId)
			this.timeoutId = null
		}
	}

	getFrequencyData(): Uint8Array {
		if (this.engine) return this.engine.getFrequencyData()
		return new Uint8Array()
	}
}
