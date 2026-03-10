const guests = [
["Ada Väkiparta",9],
["Adam Mahmoud",7],
["Adam Toth",2],
["Agnes Hofer",7],
["Agnes Rygell",3],
["Alva Wejle",3],
["Amanda Lindberg",10],
["Anastasia Vavolidou",7],
["André Franco Törnetoft",1],
["Andreas Liss",4],
["Anisa Holm",4],
["Anna Sandberg",10],
["Anna Törnblom",4],
["Aria Rahmani",5],
["Armin Mujdzic",4],
["Ayman Kurshid",4],
["Barbro Karlsson",7],
["Beatrice Raij Montanari",7],
["Boran Külekci",4],
["Carl-Johan Kjellman",4],
["Danielle Trocmé",5],
["Dino Avdic",6],
["Elektra Ammouri",7],
["Emelie Aniliadis",4],
["Emilie Sleth",9],
["Emma Christiansson",9],
["Erik Karlsson",4],
["Erik Mossberg",6],
["Fabian Bellander",9],
["Fanny",1],
["Filip Broström",2],
["Fredrik Danielsson",1],
["Fredrik Lindgren",6],
["Fredrik Löfqvist",3],
["Gabriel Bekassy Fritzson",1],
["Hanna Månsson",8],
["Hanna Sewén",5],
["Hans-Ulric Josefsson",5],
["Helene Andersson",2],
["Hilma Johansson",8],
["Ida Haag",10],
["Isa Westelius",9],
["Joanna Benes",10],
["Johan Andersson",9],
["Johan Larson",2],
["Johan Pharmanson",8],
["John Larsson",8],
["John Osser",3],
["Jonathan Yamin",7],
["Josefine Johansson",10],
["Josefine Törnbrink",2],
["Josefine Widén",4],
["Julius Nilsson",5],
["Karin Siwertz",9],
["Karl Söderlund",10],
["Kevin Ramak",10],
["Leon Nordlund",3],
["Lina Wall",1],
["Linn Jansson",1],
["Lisa Haack",8],
["Malin Nilsson",3],
["Marsel Ali",8],
["Martin Lilja",6],
["Martin Sjöberg",4],
["Mary Dehlin",3],
["Michelle Schwabe",7],
["Mihajlo Kvocka",5],
["Moa Wall",6],
["Mårten Sjögren",8],
["Oliver Treis",1],
["Otto Pehrsson",2],
["Palita Thonthan",6],
["Rebin",1],
["Saeed Alharire",9],
["Sara Königslehner",6],
["Sebastian Van Uytven",2],
["Sofia Filipoff Klarström",8],
["Svea Johansson",8],
["Tarek Al Saadi",10],
["Teodora Stamenkovic",2],
["Theodor Arnald",2],
["Therese Björå",6],
["Thomas Jerndal",7],
["Thomas Näsfeldt",5],
["Thomas Watson",3],
["Tindra Geisewall",10],
["Tushar Amin",5],
["Victor Nordlund Gendra",1],
["William Jukic",9]
].map(g=>({name:g[0],table:g[1]}));

const nameInput=document.getElementById("landingName");
const guestExperience=document.getElementById("guestExperience");

nameInput.addEventListener("input",e=>{
const val=e.target.value.toLowerCase();

const guest=guests.find(g=>g.name.toLowerCase().includes(val));

if(!guest) return;

document.getElementById("previewGuest").textContent=guest.name;
document.getElementById("previewTable").textContent="Table "+guest.table;

document.getElementById("welcomeName").textContent="Welcome "+guest.name;
document.getElementById("momentTable").textContent=guest.table;

document.getElementById("ticketGuest").textContent=guest.name;
document.getElementById("ticketTable").textContent="Table "+guest.table;

guestExperience.classList.add("visible");
});

const prompts=[
"What is one place you would return to instantly?",
"What song belongs at a dinner party?",
"What has surprised you most this year?",
"If tonight had a soundtrack, what would the first song be?",
"What is the best meal you have ever had?",
"What city changed you the most?",
"What makes an evening memorable?",
"What are you looking forward to this year?",
"What is a conversation you never get tired of?",
"What song always works on a dance floor?"
];

const promptText=document.getElementById("promptText");
const newPromptBtn=document.getElementById("newPromptBtn");

function newPrompt(){
const random=prompts[Math.floor(Math.random()*prompts.length)];
promptText.textContent=random;
}

newPromptBtn.addEventListener("click",newPrompt);
newPrompt();
