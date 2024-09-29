document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;

const mainnav = document.querySelector('nav');
const hambutton = document.querySelector('#hamburger-menu');
const headerTitle = document.querySelector('header h1');
const navLinks = document.querySelectorAll('nav ul li a');
const mainTitle = document.querySelector('main h2');

//This will hide the h1 title and open the hamburger menu
hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('open');
    hambutton.classList.toggle('open');
    if (mainnav.classList.contains('open')) {
        headerTitle.style.display = "none";
    } else {
        headerTitle.style.display = "flex";
    }
});

//If the window is resized to the larger screen while the hamburger window is open this will restore the h1 title
//and close out the hidden hamburger menu
window.addEventListener('resize', () => {
    if(window.innerWidth >= 700) {
        headerTitle.style.display = "flex";
        mainnav.classList.remove('open');
        hambutton.classList.remove('open');
    }
});

//This changes the t2 header to the name of the menu button you click on
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const linkText = event.target.textContent;
        mainTitle.textContent = linkText;

    });

});