function resizeBase64Image(base64Image, size = 512) {
    return new Promise((resolve, reject) => {
        const maxSizeInBytes = size * size;
        const img = new Image();
        img.src = base64Image;
        img.onload = function () {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext('2d');
            const width = img.width;
            const height = img.height;
            const aspectRatio = width / height;
            const newWidth = Math.sqrt(maxSizeInBytes * aspectRatio);
            const newHeight = Math.sqrt(maxSizeInBytes / aspectRatio);
            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            let quality = 0.8;
            let dataURL = canvas.toDataURL('image/jpeg', quality);
            resolve(dataURL);
        };
        img.onerror = (err) => {
            reject(err);
        };
    });
  }

  export default resizeBase64Image;