const API_KEY = "YOUR_API_KEY_HERE";

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const locationBtn = document.getElementById("locationBtn");
const error = document.getElementById("error");


// Nhập tên thành phố
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const city = cityInput.value.trim();

    if (city === "") {
        showError("Vui lòng nhập tên thành phố.");
        return;
    }

    getWeatherByCity(city);
});


// Lấy thời tiết theo thành phố
async function getWeatherByCity(city) {

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather` +
            `?q=${encodeURIComponent(city)}` +
            `&appid=${API_KEY}` +
            `&units=metric` +
            `&lang=vi`;

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Không tìm thấy thành phố.");
        }

        console.log(data);

        alert(
            `Thành phố: ${data.name}\n` +
            `Nhiệt độ: ${Math.round(data.main.temp)}°C\n` +
            `Thời tiết: ${data.weather[0].description}`
        );

    } catch (err) {

        showError(err.message);
    }
}


// Lấy vị trí thiết bị
locationBtn.addEventListener("click", function () {

    if (!navigator.geolocation) {

        showError("Trình duyệt không hỗ trợ định vị.");

        return;
    }

    locationBtn.disabled = true;

    locationBtn.innerText = "Đang lấy vị trí...";


    navigator.geolocation.getCurrentPosition(

        function (position) {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            getWeatherByLocation(lat, lon);
        },

        function () {

            showError(
                "Không thể lấy vị trí của bạn."
            );

            locationBtn.disabled = false;

            locationBtn.innerText =
                "Lấy vị trí thiết bị";
        }
    );
});


// Lấy thời tiết theo tọa độ
async function getWeatherByLocation(lat, lon) {

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather` +
            `?lat=${lat}` +
            `&lon=${lon}` +
            `&appid=${API_KEY}` +
            `&units=metric` +
            `&lang=vi`;

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                "Không thể lấy dữ liệu thời tiết."
            );
        }

        console.log(data);

        alert(
            `Thành phố: ${data.name}\n` +
            `Nhiệt độ: ${Math.round(data.main.temp)}°C\n` +
            `Thời tiết: ${data.weather[0].description}`
        );

    } catch (err) {

        showError(err.message);
    }


    locationBtn.disabled = false;

    locationBtn.innerText =
        "Lấy vị trí thiết bị";
}


function showError(message) {

    error.innerText = message;

    error.style.display = "block";
}