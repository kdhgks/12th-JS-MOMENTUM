const images = ["img01.jpeg", "img02.jpeg", "img03.jpeg"];
const BG = "background";

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
bgImage.className = BG;

bgImage.src = `img/${chosenImage}`;

document.body.appendChild(bgImage);