export const convertImageToWebP = (file: File, quality = 0.8): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("No se pudo procesar la imagen en el canvas."));
          return;
        }

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Falló la conversión de la imagen a WebP."));
              return;
            }
            // Creamos un nuevo archivo con extensión .webp
            const originalName =
              file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
            const webpFile = new File([blob], `${originalName}.webp`, {
              type: "image/webp",
            });
            resolve(webpFile);
          },
          "image/webp",
          quality,
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};
