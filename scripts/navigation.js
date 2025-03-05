const menuButton = document.getElementById('menu-button');
const navList = document.querySelector('nav ul');

menuButton.addEventListener('click', () => {
  navList.classList.toggle('active');
});

document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;