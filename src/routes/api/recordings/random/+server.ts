import { json, error } from "@sveltejs/kit";
import { RANDOM_URL, BUCKET_URL, FOLDER } from "$env/static/private";
import type { Track } from "../../../../types/track";

export async function GET() {
    const response = await fetch(RANDOM_URL)
    if (!response.ok) {
        const err = await response.json();
        error(500, err.error.message)
    }
    let track = await response.json() as Track;
    track = {...track, audioLocation: BUCKET_URL + FOLDER + `/${track.id}.mp3` }
    return json(track)
}
