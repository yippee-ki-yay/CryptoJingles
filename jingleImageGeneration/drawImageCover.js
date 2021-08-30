// fits the PIXI.Sprite to the parent
// similar to CSS background-size: cover
function drawImageCover(ctx, image, parent, scale) {
  scale = typeof scale === 'number' ? scale : 1; // eslint-disable-line
  parent = typeof parent === 'undefined' ? ctx.canvas : parent; // eslint-disable-line

  const tAspect = image.width / image.height;
  const pWidth = parent.width;
  const pHeight = parent.height;

  const pAspect = pWidth / pHeight;

  let width; let
    height;
  if (tAspect > pAspect) {
    height = pHeight;
    width = height * tAspect;
  } else {
    width = pWidth;
    height = width / tAspect;
  }
  width *= scale;
  height *= scale;
  const x = (pWidth - width) / 2;
  const y = (pHeight - height) / 2;
  ctx.drawImage(image, x, y, width, height);
}

module.exports = drawImageCover;
