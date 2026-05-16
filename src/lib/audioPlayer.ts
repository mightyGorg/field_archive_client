import { AudioRepository } from './audioRepository'
import { AudioEngine } from './audioEngine'
import type { Track } from '../types/track'
import { currentRecording } from '../stores/audio'

export class AudioPlayer {
	public repo: AudioRepository
	public currentRecording: Track | null

	private engine: AudioEngine | null = null
	private duration: number | null = null
	private timeoutId: ReturnType<typeof setTimeout> | null = null

	constructor() {
		this.currentRecording = null
		this.repo = new AudioRepository()
	}

	async playNext(fadeIn: number = 3): Promise<void> {
		const response = await fetch(`/api/recordings/random`)
		if (!response.ok)
			throw new Error(`Error ${response.status} could not fetch`)

		const recording = await response.json()
		this.currentRecording = recording
		currentRecording.set(recording)

		if (this.currentRecording) {
			this.engine = new AudioEngine(this.currentRecording.audioLocation)
			this.duration = this.currentRecording.duration
			await this.engine.play(fadeIn, this.duration)
		}

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
