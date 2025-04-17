// Fetch member data from the JSON file
async function fetchMembers() {
  try {
    const response = await fetch('../chamber/data/members.json');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const members = await response.json();
    return members;
  } catch (error) {
    console.error("Error fetching members data:", error);
    return [];
  }
}

// Create a member card element
function createMemberCard(member) {
  const card = document.createElement('div');
  card.classList.add('member-card');

  // Member image
  let portrait = document.createElement("img");
  portrait.setAttribute("src", member.imageurl);
  portrait.setAttribute("alt", member.name);
  portrait.setAttribute("loading", "lazy");
  portrait.setAttribute("width", "340");
  portrait.setAttribute("height", "440");
  card.appendChild(portrait); // ✅ Append image to the card

  // Member name
  const name = document.createElement('h2');
  name.textContent = member.name;
  card.appendChild(name);

  // Address
  const address = document.createElement('p');
  address.textContent = member.address;
  card.appendChild(address);

  // Phone
  const phone = document.createElement('p');
  phone.textContent = `Phone: ${member.phone}`;
  card.appendChild(phone);

  // Website (as a clickable link)
  const website = document.createElement('a');
  website.href = member.website;
  website.textContent = member.website;
  website.target = "_blank";
  card.appendChild(website);

  return card;
}

// Display members on the page
async function displayMembers() {
  const membersContainer = document.getElementById('members-container');
  const members = await fetchMembers();
  membersContainer.innerHTML = ''; // Clear any existing content

  members.forEach(member => {
    const card = createMemberCard(member);
    membersContainer.appendChild(card);
  });
}

// Setup view toggle functionality
function setupViewToggle() {
  const gridBtn = document.getElementById('grid-view');
  const listBtn = document.getElementById('list-view');
  const container = document.getElementById('members-container');

  gridBtn.addEventListener('click', () => {
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    container.classList.remove('list');
    container.classList.add('grid');
  });

  listBtn.addEventListener('click', () => {
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    container.classList.remove('grid');
    container.classList.add('list');
  });
}

// Toggle menu button for mobile view
document.addEventListener('DOMContentLoaded', () => {
  displayMembers();
  setupViewToggle();

  const menuButton = document.getElementById('menu-button');
  const navList = document.querySelector('nav ul');

  if (menuButton && navList) {
    menuButton.addEventListener('click', () => {
      navList.classList.toggle('active');
    });
  }

  // Set footer dynamic info
  document.getElementById('currentyear').textContent = new Date().getFullYear();
  const lastModified = new Date(document.lastModified);
  document.getElementById('lastModified').textContent =
    `Last Updated: ${lastModified.toLocaleDateString()} at ${lastModified.toLocaleTimeString()}`;

  // Add a class to membership levels based on their content
  document.querySelectorAll('.membership-level').forEach(level => {
    if (level.textContent.includes('Gold')) {
      level.classList.add('gold-member');
    } else if (level.textContent.includes('Silver')) {
      level.classList.add('silver-member');
    }
  });
});
