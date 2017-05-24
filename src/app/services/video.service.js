import {ImageService} from './image.service.js';

export class VideoService{
    constructor(videoUrl, imageUrl) {
        this.videoUrl = videoUrl;
        this.imageUrl = imageUrl;
        this.video = document.createElement('video');
        this.source = document.createElement('source');
        this.imgService = new ImageService(this.imageUrl);
        this.videoAppender();
    }

    videoAppender() {
        let container = document.querySelector('.container');
        this.source.src = this.videoUrl;
        this.video.appendChild(this.source);
        container.appendChild(this.video);
        this.videoController();
    }

    videoController() {
        this.video.addEventListener('loadeddata', () => {
            this.imgService.imageRemover();
            this.video.play()
        });
    }
}