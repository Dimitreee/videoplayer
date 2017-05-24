export class ImageService {
    constructor(imageUri) {
        this.imageUri = imageUri;
        this.imageNode = document.createElement('img');
        this.imageAppender();
    }

    imageAppender() {
        let container = document.querySelector('.container');
        this.imageNode.src = this.imageUri;
        container.appendChild(this.imageNode);
    }

    imageRemover() {
        // Можно было бы использовать transition и реализвать fadeOut с помощью изменения css класса
        // Но я решил сделать так
        let image = document.querySelector('img');
        let op = 1;
        let timer = setInterval(function () {
            if (op <= 0.1) {
                clearInterval(timer);
                image.style.display = 'none';
            }
            image.style.opacity = op;
            image.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 50);
    }
}