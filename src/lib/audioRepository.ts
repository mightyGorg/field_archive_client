import type { Track } from '../types/track'

export class AudioRepository {
	async getRandom(): Promise<Track> {
		try {
			const response = await fetch('/api/recordings/random')

			if (!response.ok) {
				throw new Error('Unable to fetch random recording')
			}

			const track = await response.json()
			return track
		} catch (err) {
			console.log('error fetching track: ', err)
			return Promise.reject()
		}
	}
}
