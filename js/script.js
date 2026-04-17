// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

const button = document.querySelector("button");
const gallery = document.getElementById("gallery");

const API_KEY = "DEMO_KEY"; // replace with your key later

button.addEventListener("click", async () => {
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;

  if (!start || !end) return;

  // loading message ✅
  gallery.innerHTML = `<p>🔄 Loading space photos...</p>`;

  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${start}&end_date=${end}`
    );

    const data = await res.json();

    displayGallery(data);

  } catch (err) {
    gallery.innerHTML = `<p>⚠️ Error loading images.</p>`;
  }
});

function displayGallery(data) {
  gallery.innerHTML = "";

  data.forEach(item => {
    // LEVEL UP: handle videos
    if (item.media_type === "video") {
      gallery.innerHTML += `
        <div class="gallery-item">
          <p><strong>${item.title}</strong> (${item.date})</p>
          <a href="${item.url}" target="_blank">▶ Watch Video</a>
        </div>
      `;
      return;
    }

    gallery.innerHTML += `
      <div class="gallery-item" onclick='openModal(${JSON.stringify(item)})'>
        <img src="${item.url}" />
        <p><strong>${item.title}</strong><br>${item.date}</p>
      </div>
    `;
  });
}

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.getElementById("closeModal");

function openModal(item) {
  modal.classList.remove("hidden");

  modalImg.src = item.url;
  modalTitle.textContent = item.title;
  modalDate.textContent = item.date;
  modalDesc.textContent = item.explanation;
}

closeModal.onclick = () => modal.classList.add("hidden");

const facts = [
  "A day on Venus is longer than a year.",
  "Neutron stars can spin 600 times per second.",
  "There are more stars than grains of sand on Earth.",
  "One million Earths could fit inside the Sun."
];

document.getElementById("spaceFact").textContent =
  "🚀 Did you know? " + facts[Math.floor(Math.random() * facts.length)];