const fs = require("fs");
const PNG = require("png-js");
const IMG_WIDTH = 4320;

PNG.decode('src/assets/img/theSkeld_shipmask.png', function (pixels) {
  const result = {};
  for (let i = 0; i < pixels.length; i += 4) {
    const row = Math.floor(i / 4 / IMG_WIDTH);
    if (pixels[i] === 0 && pixels[i + 1] === 255 && pixels[i + 2] === 0) {
      if (result[row]) {
        result[row].push((i / 4) % IMG_WIDTH);
      } else {
        result[row] = [(i / 4) % IMG_WIDTH];
      }
    }
  }
  fs.writeFileSync(
    "./mapBounds.js",
    "export const mapBounds = " + JSON.stringify(result)
  );
});
