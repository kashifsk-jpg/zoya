import sharp from "sharp";
import path from "node:path";

const SOURCE = path.resolve("public/images/brand/zoya-logo.png");
const APP_DIR = path.resolve("src/app");

async function main() {
  await sharp(SOURCE).resize(512, 512).png().toFile(path.join(APP_DIR, "icon.png"));

  await sharp(SOURCE)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(APP_DIR, "opengraph-image.png"));

  console.log("Generated src/app/icon.png and src/app/opengraph-image.png");
}

main();
