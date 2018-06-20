export const loadImage = (file) => {
  return new Promise((resolve,reject) => {
    if(file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsDataURL(file);
    }
  });
};