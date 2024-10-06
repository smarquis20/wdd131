document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;

function calculateWindChill(temp,windSpeed) {
    if (temp <= 50 && windSpeed > 3) {
        const windChill = (35.74 + 0.6215 * temp - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temp * Math.pow(windSpeed, 0.16)).toFixed(0);
        return windChill;
    } else {
        return "N/A";
    }
}

let temperature = 90;
let windSpeed = 20;
let windChill = calculateWindChill(temperature, windSpeed);

if (temperature <= 50 && windSpeed > 3) {
document.getElementById("wind-chill").textContent = windChill + "°F";
} else {
    document.getElementById("wind-chill").textContent = windChill
}