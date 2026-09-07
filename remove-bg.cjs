const Jimp = require('jimp');
const path = require('path');

async function removeBackground() {
  const inputPath = path.join(__dirname, 'ReactInicio', 'src', 'assets', 'mr-taquito-face.jpg');
  const outputPath = path.join(__dirname, 'ReactInicio', 'src', 'assets', 'mr-taquito-face.png');

  console.log('Loading image...');
  const image = await Jimp.read(inputPath);
  
  const width = image.bitmap.width;
  const height = image.bitmap.height;

  // Threshold for considering a pixel as "background white"
  const threshold = 240;
  
  function isBg(x, y) {
    const color = Jimp.intToRGBA(image.getPixelColor(x, y));
    return color.r > threshold && color.g > threshold && color.b > threshold && color.a > 0;
  }

  console.log('Starting flood fill from corners...');
  const queue = [];
  
  // Add corners to queue if they are background
  const corners = [
    {x: 0, y: 0}, 
    {x: width-1, y: 0}, 
    {x: 0, y: height-1}, 
    {x: width-1, y: height-1}
  ];

  for (let c of corners) {
    if (isBg(c.x, c.y)) {
      queue.push(c);
      image.setPixelColor(0x00000000, c.x, c.y); // Set transparent
    }
  }

  // Flood fill
  let idx = 0;
  while (idx < queue.length) {
    const {x, y} = queue[idx++];
    
    // Check neighbors
    const neighbors = [
      {x: x+1, y: y}, {x: x-1, y: y},
      {x: x, y: y+1}, {x: x, y: y-1}
    ];

    for (let n of neighbors) {
      if (n.x >= 0 && n.x < width && n.y >= 0 && n.y < height) {
        if (isBg(n.x, n.y)) {
          image.setPixelColor(0x00000000, n.x, n.y);
          queue.push(n);
        }
      }
    }
    
    if (idx % 10000 === 0) {
        console.log(`Processed ${idx} pixels...`);
    }
  }

  console.log('Saving as PNG...');
  await image.writeAsync(outputPath);
  console.log('Done!');
}

removeBackground().catch(console.error);
