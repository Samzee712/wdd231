const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";

// Button elements
const all = document.querySelector("#all");
const idaho = document.querySelector("#idaho");
const nonus = document.querySelector("#nonus");
const ten = document.querySelector("#ten");
const childs = document.querySelector("#childs");
const childl = document.querySelector("#childl");
const old = document.querySelector("#old");

// Async function to get and filter prophets data
const getProphets = async (filter = "all") => {
  try {
    let prophets = await jsonFetch(url);

    switch (filter) {
      case "idaho":
        prophets = prophets.filter((prophet) => prophet.birthplace === "Idaho");
        break;
      case "nonus":
        prophets = prophets.filter((prophet) => prophet.birthplace === "England");
        break;
      case "ten":
        prophets = prophets.filter((prophet) => prophet.length >= 15);
        break;
      case "childs":
        prophets = prophets.filter((prophet) => prophet.numofchildren < 5);
        break;
      case "childl":
        prophets = prophets.filter((prophet) => prophet.numofchildren >= 10);
        break;
      case "old":
        prophets = prophets.filter(
          (prophet) => getAgeAtDeathInYears(prophet.birthdate, prophet.death) >= 95
        );
        break;
      default:
        break;
    }

    displayProphets(prophets);
  } catch (error) {
    console.error("Error in getProphets:", error);
  }
};

// Function to fetch JSON data and return the prophets array
async function jsonFetch(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.prophets;
}

// Function to display prophets in the DOM
const displayProphets = (prophets) => {
  const cards = document.querySelector("div.cards");
  cards.innerHTML = "";

  if (prophets.length === 0) {
    let msg = document.createElement("p");
    msg.textContent = "No results found.";
    cards.appendChild(msg);
    return;
  }

  prophets.forEach((prophet, index) => {
    // Create card elements
    let card = document.createElement("section");
    card.classList.add("card"); // Allows styling through CSS for responsiveness

    let h2 = document.createElement("h2");
    h2.textContent = `${prophet.name} ${prophet.lastname}`;

    let stats = document.createElement("div");
    stats.classList.add("stats");

    let date = document.createElement("p");
    date.innerHTML = `<span class="label">Birth:</span> ${prophet.birthdate}`;

    let place = document.createElement("p");
    place.innerHTML = `<span class="label">Place:</span> ${prophet.birthplace}`;

    let num = document.createElement("p");
    num.innerHTML = `<span class="label">Children:</span> ${prophet.numofchildren}`;

    let length = document.createElement("p");
    length.innerHTML = `<span class="label">Prophet Years:</span> ${prophet.length}`;

    let death = document.createElement("p");
    death.innerHTML = `<span class="label">Death:</span> ${prophet.death}`;

    let ageatdeath = document.createElement("p");
    ageatdeath.innerHTML = `<span class="label">Age:</span> ${getAgeAtDeathInYears(
      prophet.birthdate,
      prophet.death
    )}`;

    let portrait = document.createElement("img");
    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute(
      "alt",
      `${prophet.name} ${prophet.lastname} - ${prophet.order} Latter-day Prophet`
    );
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "340");
    portrait.setAttribute("height", "440");

    // Build stats section
    stats.appendChild(date);
    stats.appendChild(place);
    stats.appendChild(num);
    stats.appendChild(length);
    stats.appendChild(death);
    stats.appendChild(ageatdeath);

    // Build card
    card.appendChild(h2);
    card.appendChild(stats);
    card.appendChild(portrait);

    // Append card to the container
    cards.appendChild(card);
  });
};

// Initial call to fetch and display all prophets
getProphets();

// Event listeners for filter buttons
all.addEventListener("click", () => {
  clearButtonClasses();
  getProphets("all");
  all.classList.add("active");
});

idaho.addEventListener("click", () => {
  clearButtonClasses();
  getProphets("idaho");
  idaho.classList.add("active");
});

nonus.addEventListener("click", () => {
  clearButtonClasses();
  getProphets("nonus");
  nonus.classList.add("active");
});

ten.addEventListener("click", () => {
  clearButtonClasses();
  getProphets("ten");
  ten.classList.add("active");
});

childs.addEventListener("click", () => {
  clearButtonClasses();
  getProphets("childs");
  childs.classList.add("active");
});

childl.addEventListener("click", () => {
  clearButtonClasses();
  getProphets("childl");
  childl.classList.add("active");
});

old.addEventListener("click", () => {
  clearButtonClasses();
  getProphets("old");
  old.classList.add("active");
});

// Function to calculate age at death (or current age if death date is missing)
function getAgeAtDeathInYears(birthdate, deathdate) {
  const birth = new Date(birthdate);
  const death = deathdate ? new Date(deathdate) : new Date();
  return Math.floor((death - birth) / (365.25 * 24 * 60 * 60 * 1000));
}

// Function to clear active class from all filter buttons
function clearButtonClasses() {
  const filterbuttons = document.querySelectorAll("button");
  filterbuttons.forEach(button => button.classList.remove("active"));
}
