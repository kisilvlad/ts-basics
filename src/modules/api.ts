import type { JsonPhoto } from "../types/JsonPhoto.d.ts";
// ----- API FETCH -----
export async function loadPhoto(id: number): Promise<JsonPhoto> {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos/" + id
    );

    if (!response.ok) {
        throw new Error("HTTP error");
    }

    const data: JsonPhoto = await response.json();

    if (typeof data.url !== "string" || typeof data.title !== "string") {
        throw new Error("Некоректний формат JSON");
    }

    console.log(data);

    return data;
}
