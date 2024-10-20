document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;

const products = [
	{
		id: "fc-1888",
		name: "flux capacitor",
		averagerating: 4.5
	},
	{
		id: "fc-2050",
		name: "power laces",
		averagerating: 4.7
	},
	{
		id: "fs-1987",
		name: "time circuits",
		averagerating: 3.5
	},
	{
		id: "ac-2000",
		name: "low voltage reactor",
		averagerating: 3.9
	},
	{
		id: "jj-1969",
		name: "warp equalizer",
		averagerating: 5.0
	}
];


function populateItems(products) {
	products.forEach(item => {
		let option = document.createElement("option");
		option.setAttribute("value", item.id);
		option.innerHTML = `<span>${item.name}</span>`;
		document.querySelector("select").appendChild(option);
	});
};

populateItems(products);

document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();

    let numVisits = parseInt(localStorage.getItem('numVisits-ls')) || 0;

    numVisits++;

    localStorage.setItem('numVisits-ls', numVisits);

    window.location.href = 'review.html';
});

window.addEventListener('DOMContentLoaded', () => {
    const reviewDisplay = document.getElementById("visits");

    let numVisits = parseInt(localStorage.getItem('numVisits-ls')) || 0;

    if (reviewDisplay) {
        if (numVisits === 1) {
            reviewDisplay.textContent = `Thank you for your first review!!`;
        } else {
            reviewDisplay.textContent = `Thank you for submitting ${numVisits} reviews!!`;
        }
    }
});