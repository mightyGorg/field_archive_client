// Looking to implement interactive mouse feature

export class Visualiser {
	private cvs: HTMLCanvasElement
	private ctx: CanvasRenderingContext2D
	private ratio: number
	private W: number
	private H: number
	private X: number

	constructor(canvas: HTMLCanvasElement) {
		this.cvs = canvas
		this.ctx = this.cvs.getContext('2d', {
			willReadFrequently: true
		}) as CanvasRenderingContext2D
		this.ratio = window.devicePixelRatio || 1
		this.W = 0
		this.H = 0
		this.X = 0
		this.resize()
		const observer = new ResizeObserver(() => this.resize())
		observer.observe(this.cvs)
	}

	resize() {
		const rect = this.cvs.getBoundingClientRect()

		const floorw = Math.floor(rect.width)
		const floorh = Math.floor(rect.height)

		if (floorw === 0 || floorh === 0) return

		this.cvs.width = floorw * this.ratio
		this.cvs.height = floorh * this.ratio

		this.ctx.setTransform(1, 0, 0, 1, 0, 0)
		this.ctx.scale(this.ratio, this.ratio)

		this.W = floorw
		this.H = floorh
		this.X = this.W - 1
		this.setCanvas()
	}

	setCanvas(): void {
		const nav = document.querySelector('nav')
		const navH = nav ? nav.offsetHeight : 0
		this.ctx.fillStyle = 'hsl(0, 0.00%, 100.00%)'
		this.ctx.fillRect(0, 0, this.W, this.H + navH)
	}

	draw(dataArray: Uint8Array): void {
		const bufferLength = dataArray.length
		const h = this.H / (bufferLength * 0.75)

		const imgData = this.ctx.getImageData(
			this.ratio,
			0,
			this.X * this.ratio,
			this.H * this.ratio
		)

		this.ctx.fillRect(0, 0, this.W, this.H)
		this.ctx.putImageData(imgData, 0, 0)
		this.ctx.imageSmoothingQuality = 'high'

		for (let i = 0; i < bufferLength; i++) {
			const ratio = Math.pow(dataArray[i] / 255, 1.5)
			const hue = Math.round(ratio * 120) + (180 % 360)

			this.ctx.lineWidth = 1
			this.ctx.beginPath()

			const sat = '100%'
			const lit = 10 + 70 * ratio + '%'

			this.ctx.strokeStyle = `hsl(${hue}, ${sat}, ${lit}, ${ratio})`
			this.ctx.moveTo(this.X, this.H - i * h)
			this.ctx.lineTo(this.X, this.H - (i * h + h))
			this.ctx.lineJoin = 'miter'
			this.ctx.lineCap = 'butt'
			this.ctx.stroke()
		}
	}
}
