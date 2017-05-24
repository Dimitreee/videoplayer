import {HttpService} from './services/http.service.js';
import {VideoService} from './services/video.service';

export class MainApp {
    constructor() {
        this.httpServce = null;
        this.videoUrl = null;
        this.imageUrl = null;
        this.storageController();
    }

    storageController() {
        let videoUrl = localStorage.getItem('video-url');
        let imageUrl = localStorage.getItem('image-url');

        if (!videoUrl && !imageUrl) {
            this.httpServce = new HttpService();

            this.httpServce.data.then(
                data => {
                    new VideoService(data.videoUrl, data.imageUrl);
                }
            );
        } else {
            new VideoService(videoUrl, imageUrl);
        }
    }
}