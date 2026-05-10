import { URL, BUCKET_URL, FOLDER } from "$env/static/private";
import type { Track } from "../../../../types/track";
import { json } from "@sveltejs/kit";

export async function GET({ url }) {
    let id = url.searchParams.get('id');
    const response = await fetch(URL + `/${id}`);

    let track = await response.json() as Track;
    track = {...track, audioLocation: BUCKET_URL + FOLDER + `/${track.id}.mp3` }
    console.log('track fetched: ' + track);

    return json(track)  
}
