// require("dotenv").config({ path: __dirname + "/.env" });
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { createCanvas, loadImage } = require("canvas");
const { twitterClient } = require("./twitterClient");
const fs = require("fs");
const { default: axios } = require("axios");

//-----Pull random quote and call generateImage()
const randomQuote = () => {
  // const url = "https://bible-api.com//data/web/random";

  axios
    .get(process.env.BIBLE_API_URL)
    .then((res) => {
      const text = `${res.data.random_verse.text} - ${res.data.random_verse.book} ${res.data.random_verse.chapter}:${res.data.random_verse.verse}`;
      generateImage(text.replace(/\r?\n|\r/g, ""));
      // console.log(text.replace(/\r?\n|\r/g, ""));
    })
    .catch((error) => {
      console.error("Error fetching data", error);
    });
};

randomQuote();

// Helper function to wrap text
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let lines = [];

  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + " ";
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  // Draw each line with background highlight
  lines.forEach((line, k) => {
    const lineY = y + k * lineHeight;
    const textWidth = ctx.measureText(line).width;

    // highlight rectangle
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // faded black
    ctx.fillRect(
      x - 5,
      lineY - lineHeight + 10,
      textWidth + 10,
      // lineHeight + 5
      lineHeight
    );

    // draw text
    ctx.fillStyle = "white"; // text color
    ctx.fillText(line, x, lineY);
  });
}

//-----Generate img with text, save it and call tweet()
async function generateImage(text) {
  const image = await loadImage(
    `./images/image${Math.trunc(Math.random() * 32)}.png`
  );
  console.log(image);
  const targetWidth = 570;
  const targetHeight = 645;

  const canvas = createCanvas(targetWidth, targetHeight);
  const ctx = canvas.getContext("2d");

  // Draw the background image
  ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

  // Set font style
  ctx.globalCompositeOperation = "Multiply";
  ctx.lineWidth = 5;
  ctx.fillStyle = "rgba(183, 183, 183, 0.33)";
  // ctx.roundRect(28, 100, targetWidth - 30, 39); //// x, y, width, height, radius
  ctx.font = "33px Times New Roman";
  ctx.strokeStyle = "black";

  // Draw wrapped text
  wrapText(ctx, text, 28, 190, targetWidth - 30, 45);

  // Save image locally
  const buffer = canvas.toBuffer("image/png");
  let newImage = `./${Math.random().toFixed(3)}.png`;
  fs.writeFileSync(`${newImage}`, buffer);
  tweet(newImage);

  return buffer;
}

//-----Upload image to tweeter
const tweet = async (newImage) => {
  try {
    // const buffer = await generateImage();

    //// Check user's id(user who tagged bot)
    // const myUserID = (await twitterClient.v2.me()).data.id;
    // console.log(myUserID);

    const readImage = fs.readFileSync(newImage);

    // Upload media (uses v1 endpoint)
    const mediaID = await twitterClient.v1.uploadMedia(readImage, {
      type: "png",
    });

    // Send tweet with media
    const { data } = await twitterClient.v2.tweet({
      text: "",
      media: { media_ids: [mediaID] },
    });

    console.log("✅ Tweet posted:", data);
  } catch (e) {
    console.log("❌ Error posting tweet:", e);
  }
};
