export type Track = {
	recordingid: number
	title: string
	audioLocation: string
	dateUploaded: Date
	dateRecorded: Date
	locationID: int
	duration: number
	format: string | null
	description: string
	equipment: string | null
	size: number
	channels: string | null
	license: string | null
}
