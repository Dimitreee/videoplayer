export class HttpService {
    constructor () {
        this.dataUrl = null;
        this.videoUrl = null;
        this.imageUrl = null;
        this.data = this.getAppData().then(
            response => {
                return this.getVideoXml(response)
            }
        );
    }

    getAppData() {
        return new Promise((resolve)=> {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://api.viqeo.tv/v1/data/init?video[]=1853477d5dcac86d1260&profile=12', false);

            xhr.onreadystatechange = () => {
                let response = JSON.parse(xhr.responseText);
                this.imageUrl = response.formats[0].options.previewImage;
                this.dataUrl = response.formats[0].dataUrl;
                resolve(this.dataUrl);
                // this.getVideoXml(this.dataUrl);
            };
            xhr.send();
        });
    }

    getVideoXml(url) {
        return new Promise((resolve)=> {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);

            xhr.onreadystatechange = () => {
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
                let xmlMediaDomObj = xmlDoc.querySelector('MediaFile').firstChild;

                this.videoUrl = xmlMediaDomObj.wholeText;
                this.storageSetter();

                resolve({
                    videoUrl: this.videoUrl,
                    imageUrl: this.imageUrl
                });
            };
            xhr.send();
        })
    }

    storageSetter() {
        localStorage.setItem('video-url', this.videoUrl);
        localStorage.setItem('image-url', this.imageUrl);
    }
}