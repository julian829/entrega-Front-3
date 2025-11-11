const boton = document.getElementById('nuevoConsejo');
const consejoActual = document.getElementById('consejoActual');
const historial = document.getElementById('historialConsejos');

let historialArray = JSON.parse(localStorage.getItem('historialConsejos')) || [];


historialArray.forEach(c => {
    const li = document.createElement('li');
    li.textContent = c;
    historial.appendChild(li);
});

boton.addEventListener('click', () => {
    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            const consejo = data.slip.advice;
            consejoActual.textContent = consejo;

            historialArray.push(consejo);
            localStorage.setItem('historialConsejos', JSON.stringify(historialArray));

            const li = document.createElement('li');
            li.textContent = consejo;
            historial.appendChild(li);
        })
        .catch(error => {
            console.error('Error al obtener consejo:', error);
            consejoActual.textContent = 'No pudimos obtener un consejo ahora. Intenta de nuevo.';
        });
});
