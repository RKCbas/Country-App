import type { ImageInterface } from "../interfaces/Image.interface";
import type { Result } from "../interfaces/Unsplash-Search.interface";

export class ImageMapper {
    static mapResultToImage(result: Result): ImageInterface {
        return <ImageInterface>{
            id: result.id,
            imageUrl: result.urls.raw,
            alt_description: result.alt_description
        }
    }

    static mapResultsArrayToImagesArray(results: Result[]): ImageInterface[] {
        return results.map(this.mapResultToImage)
    }

}