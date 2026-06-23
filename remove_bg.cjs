const Jimp = require('jimp');

async function removeWhiteBg() {
  const image = await Jimp.read('./public/pixel_cake.png');
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    if (r > 240 && g > 240 && b > 240) {
      this.bitmap.data[idx + 3] = 0; // Set alpha to 0
    }
  });
  await image.writeAsync('./public/pixel_cake.png');
  console.log('Background removed!');
}

removeWhiteBg();
