let key = 'b3b72c4ba234d38accdd2082b47f92e7';
let ciudad = document.getElementById('city');
let boton = document.getElementById('btn');
let resultado = document.getElementById('resultado');
let get_weather = () => {
    let city_name = ciudad.value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${key}&units=metric`
    fetch(url).then((resp) => resp.json()).then(data => {
        console.log("la temperatura es" + (data.main.temp) + '°');
        console.log(data);
        console.log(data.weather[0].description);
        resultado.innerHTML = `<h2>${data.name}</h2>
        <h1>${data.main.temp}</h1>
        <h4>${data.weather[0].description}`
    })
}
boton.addEventListener('click', get_weather);