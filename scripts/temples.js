document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;

const mainnav = document.querySelector('nav');
const hambutton = document.querySelector('#hamburger-menu');
const headerTitle = document.querySelector('header h1');
const navLinks = document.querySelectorAll('nav ul li a');
const mainTitle = document.querySelector('main h2');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('open');
    hambutton.classList.toggle('open');
    if (mainnav.classList.contains('open')) {
        headerTitle.style.display = "none";
    } else {
        headerTitle.style.display = "flex";
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const linkText = event.target.textContent;
        mainTitle.textContent = linkText;

    });

});