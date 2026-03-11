const guests = [
  ["Ada Väkiparta",9],["Adam Mahmoud",7],["Adam Toth",2],["Agnes Hofer",7],["Agnes Rygell",3],
  ["Alva Wejle",3],["Amanda Lindberg",10],["Anastasia Vavolidou",7],["André Franco Törnetoft",1],
  ["Andreas Liss",4],["Anisa Holm",4],["Anna Sandberg",10],["Anna Törnblom",4],["Aria Rahmani",5],
  ["Armin Mujdzic",4],["Ayman Kurshid",4],["Barbro Karlsson",7],["Beatrice Raij Montanari",7],
  ["Boran Külekci",4],["Carl-Johan Kjellman",4],["Danielle Trocmé",5],["Dino Avdic",6],
  ["Elektra Ammouri",7],["Emelie Aniliadis",4],["Emilie Sleth",9],["Emma Christiansson",9],
  ["Erik Karlsson",4],["Erik Mossberg",6],["Fabian Bellander",9],["Fanny Hallencreutz",1],["Filip Broström",2],
  ["Fredrik Danielsson",1],["Fredrik Lindgren",6],["Fredrik Löfqvist",3],["Gabriel Bekassy Fritzson",1],
  ["Hanna Månsson",8],["Hanna Sewén",5],["Hans-Ulric Josefsson",5],["Helene Andersson",2],
  ["Hilma Johansson",8],["Ida Haag",10],["Isa Westelius",9],["Joanna Benes",10],["Johan Andersson",9],
  ["Johan Larson",2],["Johan Pharmanson",8],["John Larsson",8],["John Osser",3],["Jonathan Yamin",7],
  ["Josefine Johansson",10],["Josefine Törnbrink",2],["Josefine Widén",4],["Julius Nilsson",5],
  ["Karin Siwertz",9],["Karl Söderlund",10],["Kevin Ramak",10],["Leon Nordlund",3],["Lina Wall",1],
  ["Linn Jansson",1],["Lisa Haack",8],["Malin Nilsson",3],["Marsel Ali",8],["Martin Lilja",6],
  ["Martin Sjöberg",4],["Mary Dehlin",3],["Michelle Schwabe",7],["Mihajlo Kvocka",5],["Moa Wall",6],
  ["Mårten Sjögren",8],["Oliver Treis",1],["Otto Pehrsson",2],["Palita Thonthan",6],["Rebin",1],
  ["Saeed Alharire",9],["Sara Königslehner",6],["Sebastian Van Uytven",2],["Sofia Filipoff Klarström",8],
  ["Svea Johansson",8],["Tarek Al Saadi",10],["Teodora Stamenkovic",2],["Theodor Arnald",2],
  ["Therese Björå",6],["Thomas Jerndal",7],["Thomas Näsfeldt",5],["Thomas Watson",3],
  ["Tindra Geisewall",10],["Tushar Amin",5],["Victor Nordlund Gendra",1],["William Jukic",9]
].map(([name, table]) => ({ name, table }));

const prompts = [
  "What song always belongs at a dinner party?",
  "What is one place you would return to instantly?",
  "What has surprised you most this year?",
  "If tonight had a soundtrack, what would the first song be?",
  "What small detail makes an evening memorable?",
  "What city changed you the most?",
  "What is the best meal you have ever had?",
  "What are you looking forward to this year?",
  "What is a conversation you never get tired of?",
  "What song always works on a dance floor?"
];

function normalize(v) {
  return String(v || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function referenceId(name) {
  return "KC-" + normalize(name).replace(/[^a-z0-9]/g, "").slice(0, 10).toUpperCase();
}

function walletPayload(guest) {
  return {
    organizationName: "Hotel Kung Carl Event",
    description: "Personal guest invitation",
    serialNumber: referenceId(guest.name),
    guest: guest.name,
    table: guest.table,
    venue: "Hotel Kung Carl, Stockholm",
    playlist: "https://open.spotify.com/playlist/0ZPK7dOrXjN0dy2uHPmm4P?si=dcAsIxUfQt-jPHn06EeLdg&pt=f9c3d91a9304f0867ed5d4cbb2b463f1"
  };
}

const landing = document.getElementById("landing");
const landingName = document.getElementById("landingName");
const landingSuggestions = document.getElementById("landingSuggestions");
const landingMessage = document.getElementById("landingMessage");
const previewGuest = document.getElementById("previewGuest");
const previewTable = document.getElementById("previewTable");
const nameForm = document.getElementById("nameForm");
const guestPage = document.getElementById("guestPage");
const welcomeName = document.getElementById("welcomeName");
const welcomeMeta = document.getElementById("welcomeMeta");
const guestHeadline = document.getElementById("guestHeadline");
const arrivalText = document.getElementById("arrivalText");
const momentTable = document.getElementById("momentTable");
const ticketGuest = document.getElementById("ticketGuest");
const ticketTable = document.getElementById("ticketTable");
const ticketId = document.getElementById("ticketId");
const walletDownloadBtn = document.getElementById("walletDownloadBtn");
const promptText = document.getElementById("promptText");
const newPromptBtn = document.getElementById("newPromptBtn");
const backToLanding = document.getElementById("backToLanding");

let currentGuest = null;

function lookupGuests(term) {
  const q = normalize(term.trim());
  if (!q) return [];
  return guests.filter(g => normalize(g.name).includes(q)).slice(0, 8);
}

function showSuggestions(container, items, onSelect) {
  if (!items.length) {
    container.style.display = "none";
    container.innerHTML = "";
    return;
  }

  container.innerHTML = items
    .map(item => `<div class="suggestion" data-name="${item.name}">${item.name} <small>· Table ${item.table}</small></div>`)
    .join("");

  container.style.display = "block";

  container.querySelectorAll(".suggestion").forEach(node => {
    node.addEventListener("click", () => {
      const guest = guests.find(g => g.name === node.dataset.name);
      if (guest) onSelect(guest);
      container.style.display = "none";
    });
  });
}

function revealGuestPage() {
  landing.style.transition = "opacity 0.45s ease";
  landing.style.opacity = "0";

  setTimeout(() => {
    landing.style.display = "none";
    guestPage.classList.add("visible");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 450);
}

function returnToLanding() {
  guestPage.classList.remove("visible");
  guestPage.style.display = "none";

  landing.style.display = "flex";
  landing.style.opacity = "0";

  requestAnimationFrame(() => {
    landing.style.transition = "opacity 0.45s ease";
    landing.style.opacity = "1";
  });

  landingName.value = "";
  landingMessage.textContent = "Find your name to open your personal invitation.";
  landingSuggestions.style.display = "none";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function selectGuest(guest) {
  currentGuest = guest;

  previewGuest.textContent = guest.name;
  previewTable.textContent = `Table ${guest.table}`;

  welcomeName.textContent = `Welcome, ${guest.name}`;
  welcomeMeta.textContent = `Table ${guest.table} has been prepared for your arrival.`;
  guestHeadline.textContent = `Table ${guest.table} awaits`;
  arrivalText.innerHTML = `Good evening, <strong>${guest.name}</strong>. Your place is set at <strong>Table ${guest.table}</strong>. Your personal invitation and the shared Spotify playlist are ready below.`;
  momentTable.textContent = `Table ${guest.table}`;
  ticketGuest.textContent = guest.name;
  ticketTable.textContent = `Table ${guest.table}`;
  ticketId.textContent = `Reference: ${referenceId(guest.name)}`;
  landingMessage.innerHTML = `<strong>${guest.name}</strong> found. Opening your invitation...`;

  revealGuestPage();
}

landingName.addEventListener("input", (e) => {
  const matches = lookupGuests(e.target.value);

  showSuggestions(landingSuggestions, matches, (guest) => {
    landingName.value = guest.name;
    selectGuest(guest);
  });
});

nameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const match = guests.find(g => normalize(g.name) === normalize(landingName.value.trim()));

  if (!match) {
    landingMessage.textContent = "Guest not found. Select your name from the suggestions to continue.";
    return;
  }

  selectGuest(match);
});

document.addEventListener("click", (e) => {
  if (!e.target.closest("#nameForm")) {
    landingSuggestions.style.display = "none";
  }
});

walletDownloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!currentGuest) return;

  const blob = new Blob([JSON.stringify(walletPayload(currentGuest), null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${referenceId(currentGuest.name)}-wallet-pass.json`;
  a.click();

  setTimeout(() => URL.revokeObjectURL(url), 500);
});

function newPrompt() {
  const random = prompts[Math.floor(Math.random() * prompts.length)];
  promptText.textContent = random;
}

newPromptBtn.addEventListener("click", newPrompt);
backToLanding.addEventListener("click", returnToLanding);

newPrompt();
