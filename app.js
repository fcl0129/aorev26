const guests=[
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
].map(g=>({name:g[0],table:g[1]}));

const prompts=[
"What song always belongs at a dinner party?",
"What place would you visit again instantly?",
"What surprised you most this year?",
"If tonight had a soundtrack, what would the first song be?",
"What makes a dinner unforgettable?"
];

const landing=document.getElementById("landing");
const landingName=document.getElementById("landingName");
const suggestions=document.getElementById("landingSuggestions");
const nameForm=document.getElementById("nameForm");

const guestPage=document.getElementById("guestPage");
const welcomeName=document.getElementById("welcomeName");
const welcomeMeta=document.getElementById("welcomeMeta");
const momentTable=document.getElementById("momentTable");

const promptText=document.getElementById("promptText");
const newPromptBtn=document.getElementById("newPromptBtn");

const backBtn=document.getElementById("backToLanding");

function normalize(v){
return v.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g,"");
}

function lookup(term){
const q=normalize(term);
if(!q)return[];
return guests.filter(g=>normalize(g.name).includes(q)).slice(0,6);
}

landingName.addEventListener("input",e=>{

const matches=lookup(e.target.value);

if(!matches.length){
suggestions.style.display="none";
return;
}

suggestions.innerHTML=matches.map(g=>
`<div class="suggestion" data-name="${g.name}">
${g.name} · Table ${g.table}
</div>`
).join("");

suggestions.style.display="block";

document.querySelectorAll(".suggestion").forEach(el=>{
el.onclick=()=>{
selectGuest(el.dataset.name);
};
});

});

function selectGuest(name){

const guest=guests.find(g=>g.name===name);
if(!guest)return;

welcomeName.textContent=`Welcome ${guest.name}`;
welcomeMeta.textContent=`You are seated at Table ${guest.table}.`;
momentTable.textContent=guest.table;

landing.style.display="none";
guestPage.classList.add("visible");

window.scrollTo({top:0,behavior:"smooth"});

}

nameForm.addEventListener("submit",e=>{
e.preventDefault();
selectGuest(landingName.value);
});

backBtn.onclick=()=>{
guestPage.classList.remove("visible");
landing.style.display="flex";
landingName.value="";
};

function newPrompt(){
promptText.textContent=
prompts[Math.floor(Math.random()*prompts.length)];
}

newPromptBtn.onclick=newPrompt;
newPrompt();
