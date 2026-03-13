const guests = [
["Ada Väkiparta",9],["Adam Mahmoud",7],["Adam Toth",2],["Agnes Hofer",7],
["Agnes Rygell",3],["Alva Wejle",3],["Amanda Lindberg",10],["Anastasia Vavolidou",7],
["André Franco Törnetoft",1],["Andreas Liss",4],["Anisa Holm",4],["Anna Sandberg",10],
["Anna Törnblom",4],["Aria Rahmani",5],["Armin Mujdzic",4],["Ayman Kurshid",4],
["Barbro Karlsson",7],["Beatrice Raij Montanari",7],["Boran Külekci",4],["Carl-Johan Kjellman",4],
["Danielle Trocmé",5],["Dino Avdic",6],["Elektra Ammouri",7],["Emelie Aniliadis",4],
["Emilie Sleth",9],["Emma Christiansson",9],["Erik Karlsson",4],["Erik Mossberg",6],
["Fabian Bellander",9],["Fanny Hallencreutz",1],["Filip Broström",2],["Fredrik Danielsson",1],
["Fredrik Lindgren",6],["Fredrik Löfqvist",3],["Gabriel Bekassy Fritzson",1],["Hanna Månsson",8],
["Hanna Sewén",5],["Hans-Ulric Josefsson",5],["Helene Andersson",2],["Hilma Johansson",8],
["Ida Haag",10],["Isa Westelius",9],["Joanna Benes",10],["Johan Andersson",9],
["Johan Larson",2],["Johan Pharmanson",8],["John Larsson",8],["John Osser",3],
["Jonathan Yamin",7],["Josefine Johansson",10],["Josefine Törnbrink",2],["Josefine Widén",4],
["Julius Nilsson",5],["Karin Siwertz",9],["Karl Söderlund",10],["Kevin Ramak",10],
["Leon Nordlund",3],["Lina Wall",1],["Linn Jansson",1],["Lisa Haack",8],
["Malin Nilsson",3],["Marsel Ali",8],["Martin Lilja",6],["Martin Sjöberg",4],
["Mary Dehlin",3],["Michelle Schwabe",7],["Mihajlo Kvocka",5],["Moa Wall",6],
["Mårten Sjögren",8],["Abel Asmerom",1],["Otto Pehrsson",2],["Palita Thonthan",6],
["Rebin Jaferzadeh",1],["Saeed Alharire",9],["Sara Königslehner",6],["Sebastian Van Uytven",2],
["Sofia Filipoff Klarström",8],["Svea Johansson",8],["Tarek Al Saadi",10],["Teodora Stamenkovic",2],
["Theodor Arnald",2],["Therese Björå",6],["Thomas Jerndal",7],["Thomas Näsfeldt",5],
["Thomas Watson",3],["Tindra Geisewall",10],["Tushar Amin",5],["Victor Nordlund Gendra",1],
["William Jukic",9]
].map(([name, table]) => ({ name, table }));

const tableHosts = {
  1: "Victor Nordlund Gendra",
  2: "Theodor Arnald",
  3: "Agnes Rygell",
  4: "Andreas Liss",
  5: "Aria Rahmani",
  6: "Dino Avdic",
  7: "Jonathan Yamin",
  8: "Mårten Sjögren",
  9: "Johan Andersson",
  10: "Joanna Benes"
};

const prompts = [
  "Vilken låt hör alltid hemma på en riktigt bra fest?",
  "Vilken stad har gjort störst intryck på dig?",
  "Vilken middag glömmer du aldrig?",
  "Vilket resmål vill du återvända till direkt?",
  "Vad gör en kväll riktigt minnesvärd?",
  "Vilket ämne kan du prata om hur länge som helst?",
  "Vad är det mest oväntade som hänt dig i år?",
  "Om kvällen hade ett soundtrack – vilken låt öppnar?"
];

const landing = document.getElementById("landing");
const guestPage = document.getElementById("guestPage");

const nameInput = document.getElementById("landingName");
const nameForm = document.getElementById("nameForm");
const landingMessage = document.getElementById("landingMessage");

const welcomeName = document.getElementById("welcomeName");
const welcomeMeta = document.getElementById("welcomeMeta");
const tableDisplay = document.getElementById("momentTable");

const tableGuestsEl = document.getElementById("tableGuests");
const tableHostInlineEl = document.getElementById("tableHostInline");

const promptText = document.getElementById("promptText");
const newPromptBtn = document.getElementById("newPromptBtn");

const backBtn = document.getElementById("backToLanding");

function normalize(str) {
  return String(str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function findGuest(name) {
  const q = normalize(name);

  if (!q) {
    return null;
  }

  const exact = guests.find(g => normalize(g.name) === q);
  if (exact) {
    return exact;
  }

  const startsWithMatches = guests.filter(g => normalize(g.name).startsWith(q));
  if (startsWithMatches.length === 1) {
    return startsWithMatches[0];
  }

  const includesMatches = guests.filter(g => normalize(g.name).includes(q));
  if (includesMatches.length === 1) {
    return includesMatches[0];
  }

  return null;
}

function renderTableInfo(table) {
  const tableGuests = guests
    .filter(g => g.table === table)
    .sort((a, b) => a.name.localeCompare(b.name, "sv"));

  tableGuestsEl.innerHTML = tableGuests.map(g => `<div>${g.name}</div>`).join("");
  tableHostInlineEl.textContent = tableHosts[table] || "Bordsansvarig";
}

function lockLandingScroll() {
  document.body.classList.add("landing-lock");
}

function unlockScroll() {
  document.body.classList.remove("landing-lock");
}

function openGuestPage(guest) {
  welcomeName.textContent = `Välkommen, ${guest.name}`;
  welcomeMeta.textContent = `Du sitter vid bord ${guest.table}.`;
  tableDisplay.textContent = guest.table;

  renderTableInfo(guest.table);
  sessionStorage.setItem("activeGuest", guest.name);

  landing.classList.remove("active");
  guestPage.classList.add("active");

  unlockScroll();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function returnToLanding() {
  guestPage.classList.remove("active");
  landing.classList.add("active");

  lockLandingScroll();

  nameInput.value = "";
  sessionStorage.removeItem("activeGuest");
  landingMessage.textContent = "Skriv in ditt fullständiga namn för att fortsätta.";

  window.scrollTo({ top: 0 });

  setTimeout(() => {
    nameInput.focus();
  }, 200);
}

function newPrompt() {
  const random = prompts[Math.floor(Math.random() * prompts.length)];
  promptText.textContent = random;
}

nameForm.addEventListener("submit", e => {
  e.preventDefault();

  const guest = findGuest(nameInput.value);

  if (!guest) {
    landingMessage.textContent = "Vi kunde inte hitta någon exakt träff. Testa med för- och efternamn.";
    return;
  }

  landingMessage.textContent = `Välkommen ${guest.name}!`;
  openGuestPage(guest);
});

newPromptBtn.addEventListener("click", newPrompt);
backBtn.addEventListener("click", returnToLanding);

landing.classList.add("active");
lockLandingScroll();
newPrompt();

const savedGuestName = sessionStorage.getItem("activeGuest");
if (savedGuestName) {
  const savedGuest = findGuest(savedGuestName);
  if (savedGuest) {
    openGuestPage(savedGuest);
  }
}

setTimeout(() => {
  nameInput.focus();
}, 300);
