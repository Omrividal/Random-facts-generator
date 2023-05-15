const btn = document.querySelector(".btn");
const main = document.getElementById("main");
const input = document.getElementById("number");
const automaticGeneratedQuotes = document.querySelectorAll(".styledDiv");
const small = document.querySelector("small");
const heartIcon = document.querySelector(".heart");
const dynamicYear = document.querySelector("footer span");
const regenerateBtn = document.querySelector(".regenerate");

// Empty data array to store quotes
let data = [];

// Dynamic year in the footer
const date = new Date();
const year = date.getFullYear();
dynamicYear.innerHTML = `${year}`;

// Function that gets random quotes
async function getRandomQuotes() {
  const limit = 5;
  const res = await fetch(
    `https://api.api-ninjas.com/v1/facts?limit=${limit}`,
    {
      method: "GET",
      headers: {
        "X-Api-Key": "djvxLrgmj/sQOd0IeldveA==Sar6TfneIo7fDNq6",
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();

  // receiving the fact from data
  const quote = data[0].fact;

  addQuote(quote);
}

// Add quote to data arr
function addQuote(item) {
  data.push(item);

  if (data.length > 5) {
    data.pop(item);
    small.style.visibility = "visible";
    regenerateBtn.style.display = "none";
  }

  if (data.length == 5) {
    main.innerHTML = ``;
    regenerateBtn.style.display = "block";
    btn.style.display = "none";
  }
  updateDom();
}

// update DOM
function updateDom(providedData = data) {
  main.innerHTML = ``;
  providedData.forEach((item) => {
    const el = document.createElement("div");
    el.classList.add("styledDiv");
    el.innerHTML = `${item}`;
    main.appendChild(el);
  });
}

// Generate quotes as the input's value
function generateQuote() {
  for (let i = 0; i < input.value; i++) {
    getRandomQuotes();
  }

  updateDom();
}

// Regenerate facts function
function regenerateFacts() {
  small.style.visibility = "hidden";

  if (data.length >= 0 && data.length < 5) {
    regenerateBtn.style.display = "none";
    btn.style.display = "block";
  } else if (data.length == 5) {
    clearBtn();
  }
}

// Clearing the regenerate button + main area + data arr
function clearBtn() {
  regenerateBtn.style.display = "none";
  btn.style.display = "block";
  main.innerHTML = ``;
  data = [];
}

// Event Listeners
btn.addEventListener("click", generateQuote);
regenerateBtn.addEventListener("click", regenerateFacts);
