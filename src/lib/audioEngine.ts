export class AudioEngine {
	audio: HTMLAudioElement
	url: string
	ctx: AudioContext
	source: MediaElementAudioSourceNode
	analyser: AnalyserNode
	gain: GainNode

	constructor(url: string) {
		this.url = url
		this.audio = new Audio()
		this.audio.src = this.url
		this.audio.crossOrigin = 'anonymous'

		this.ctx = new AudioContext()
		this.source = this.ctx.createMediaElementSource(this.audio)
		this.analyser = this.ctx.createAnalyser()
		this.gain = this.ctx.createGain()

		this.source.connect(this.gain)
		this.gain.connect(this.analyser)
		this.analyser.connect(this.ctx.destination)
	}

	setFadeIn(fadeIn: number = 2) {
		this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime)
		this.gain.gain.exponentialRampToValueAtTime(
			1,
			this.ctx.currentTime + fadeIn
		)
	}

	setFadeOut(duration: number, fadeIn: number) {
		this.gain.gain.setValueAtTime(1, duration - (this.ctx.currentTime + fadeIn))
		this.gain.gain.exponentialRampToValueAtTime(0.001, duration - 1)
	}

	async play(fadeIn: number = 2, duration: number = 0) {
		this.setFadeIn(fadeIn)
		this.setFadeOut(duration, fadeIn)

		await this.ctx.resume()
		console.log('audio context state: ', this.ctx.state)

		try {
			await this.audio.play()
		} catch (err) {
			console.log('Error playing audio: ', err)
		}
	}

	pause() {
		this.audio.pause()
	}

	getFrequencyData(): Uint8Array {
		const bufferLength = this.analyser.frequencyBinCount
		const data = new Uint8Array(bufferLength)
		this.analyser.getByteFrequencyData(data)
		return data
	}
}
