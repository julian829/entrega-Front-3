const boton = document.getElementById('buscar');
const input = document.getElementById('letra');
const imagen = document.getElementById('imagen');
const mensaje = document.getElementById('mensaje');
const listaHistorial = document.getElementById('lista-historial');


let historialArray = JSON.parse(localStorage.getItem('historialPokemons')) || [];
historialArray.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p;
    listaHistorial.appendChild(li);
});

async function buscarPokemon() {
    const letra = input.value.toLowerCase();
    if (!letra) {
        mensaje.textContent = "Escribe una letra primero 😅";
        imagen.src = "";
        return;
    }

    mensaje.textContent = "Cargando...";
    imagen.src = "";

    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        const data = await res.json();
        const lista = data.results;
        let encontrado = lista.find(p => p.name.startsWith(letra));
        if (encontrado) {
            const pokeRes = await fetch(encontrado.url);
            const pokeData = await pokeRes.json();
            mensaje.textContent = encontrado.name.toUpperCase();
            imagen.src = pokeData.sprites.front_default;


            historialArray.push(encontrado.name.toUpperCase());
            localStorage.setItem('historialPokemons', JSON.stringify(historialArray));

            const li = document.createElement('li');
            li.textContent = encontrado.name.toUpperCase();
            listaHistorial.appendChild(li);
        } else {
            mensaje.textContent = "No hay pokémon con esa letra 😔";
        }
    } catch (e) {
        mensaje.textContent = "Error al cargar los datos 😢";
    }
}

boton.addEventListener('click', buscarPokemon);
