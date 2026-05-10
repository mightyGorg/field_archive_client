export class AudioEngine {
    audio: HTMLAudioElement;
    url: string;
    ctx: AudioContext;
    source: MediaElementAudioSourceNode;
    analyser: AnalyserNode;
    gain: GainNode;

    constructor(url: string) {
        this.url = url
        this.audio = new Audio();
        this.audio.src = this.url
        this.audio.crossOrigin = "anonymous";

        this.ctx = new AudioContext();
        this.source = this.ctx.createMediaElementSource(this.audio);
        this.analyser = this.ctx.createAnalyser();
        this.gain = this.ctx.createGain();

        this.source.connect(this.gain);
        this.gain.connect(this.analyser)
        this.analyser.connect(this.ctx.destination);
    }

    async play(fadeIn: number = 2) {
        this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        this.gain.gain.exponentialRampToValueAtTime(1, this.ctx.currentTime + fadeIn);
//        this.gain.gain.setValueAtTime(
//            1, 
//            this.ctx.currentTime + (this.audio.duration ?? 0) - fadeIn
//        );
//        this.gain.gain.exponentialRampToValueAtTime(0.001, (this.audio.duration ?? 0) - 1)
        await this.ctx.resume();
        await this.audio.play();
        console.log(this.ctx.state)
    }

    pause() {
        this.audio.pause();
    }

    getFrequencyData(): Uint8Array {
        const bufferLength = this.analyser.frequencyBinCount
        const data = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(data);
        return data; 
    }
}
