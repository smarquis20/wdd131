document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;

const mainnav = document.querySelector('nav');
const hambutton = document.querySelector('#hamburger-menu');
const headerTitle = document.querySelector('header h1');
const navLinks = document.querySelectorAll('nav ul li a');
const mainTitle = document.querySelector('main h2');
const filteredTemplesDiv = document.querySelector('.filtered-temples');

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Nashville Tennessee",
        location: "Nashville, Tennessee, United States",
        dedicated: "2000, May, 21",
        area: 10700,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/nashville-tennessee/400x250/nashville-temple-lds-1039735-wallpaper.jpg"
    },
    {
        templeName: "Columbia South Carolina",
        location: "Columbia, South Carolina, United States",
        dedicated: "1999, October, 16",
        area: 10700,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/columbia-south-carolina/400x250/columbia-temple-768161-wallpaper.jpg"
    },
    {
        templeName: "Atlanta Georgia",
        location: "Atlanta, Georgia, United States",
        dedicated: "1983, June, 1",
        area: 34500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/atlanta-georgia/400x250/atlanta-georgia-mormon-temple-900182-wallpaper.jpg"
    },
    {
        templeName: "Bern Switzerland",
        location: "Bern, Switzerland",
        dedicated: "1955, September, 11",
        area: 35546,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/bern-switzerland/400x250/bern-switzerland-temple-lds-784290-wallpaper.jpg"
    }
];

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
    if (window.innerWidth >= 700) {
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

function createTempleCard(temple) {
    const templeCard = document.createElement('section');
    const img = document.createElement('img');
    const name = document.createElement('h3');
    const location = document.createElement('p');
    const dedication = document.createElement('p');
    const area = document.createElement('p');

    name.textContent = temple.templeName;
    location.innerHTML = `<span class="label">location:</span> ${temple.location}`;
    dedication.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;
    area.innerHTML = `<span class="label">Size:</span> ${temple.area} sq ft`;
    img.setAttribute("src", temple.imageUrl);
    img.setAttribute("alt", `${temple.templeName} Temple`);
    img.setAttribute("loading", "lazy");
    img.setAttribute("width", "400");
    img.setAttribute("height", "250");

    templeCard.appendChild(name);
    templeCard.appendChild(location);
    templeCard.appendChild(dedication);
    templeCard.appendChild(area);
    templeCard.appendChild(img);

    filteredTemplesDiv.appendChild(templeCard);
}

function displayTemples(templesArray) {
    filteredTemplesDiv.innerHTML = '';
    templesArray.forEach(temple => createTempleCard(temple));
}

function filteredTemples(filter) {
    let filtered;
    if (filter === 'Old') {
        filtered = temples.filter(temple => new Date(temple.dedicated).getFullYear() < 1900);
    } else if (filter === 'New') {
        filtered = temples.filter(temple => new Date(temple.dedicated).getFullYear() > 2000);
    } else if (filter === 'Large') {
        filtered = temples.filter(temple => temple.area > 90000);
    } else if (filter === 'Small') {
        filtered = temples.filter(temple => temple.area < 10000);
    } else {
        filtered = temples;
    }
    displayTemples(filtered);
}

displayTemples(temples);

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const filter = event.target.textContent;
        mainTitle.textContent = filter;
        filteredTemples(filter);
    });
});