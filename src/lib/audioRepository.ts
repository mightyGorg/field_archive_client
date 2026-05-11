import type { Track } from "../types/track";

export class AudioRepository {
    public idStore: Set<number>;
    public length: number

    constructor() {
        this.idStore = new Set<number>();
        this.length = 0; 
    }

    async fetchSize(): Promise<void> {
        try {
        const response: Response = await fetch('/api/recordings/count');
        if (! response.ok) {
            throw new Error("Trouble fetching count");
        }
        const data = await response.json(); 
        this.length = data.count; 
        while (this.idStore.size < data.count) {
            const n: number = Math.floor(Math.random() * (data.count) + 1); 
            this.idStore.add(n)
        }
        } catch (error) {
            console.log(error)
        }
    }

    getIDAtIndex(index: number): number {
        return [...this.idStore][index] 
    }

    async getRandom(): Promise<Track> {
        try {
            const response = await fetch('/api/recordings/random');

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
