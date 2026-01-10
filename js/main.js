const countdownTarget = new Date(2026, 1, 14, 0, 0, 0);

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownTarget.getTime() - now;

    if (distance < 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? `0${days}` : days;
    document.getElementById("hours").innerText = hours < 10 ? `0${hours}` : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? `0${seconds}` : seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

document.getElementById('year').innerText = new Date().getFullYear();

const form = document.getElementById("newsletter-form");
const formStatus = document.getElementById("form-status");

async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    formStatus.classList.remove("hidden");
    formStatus.innerHTML = '<i class="fas fa-circle-notch fa-spin text-brand-red"></i> Enviando...';

    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.innerHTML = '<span class="text-green-500"><i class="fas fa-check-circle"></i> ¡Gracias! Te avisaremos pronto.</span>';
            form.reset();
        } else {
            const result = await response.json();
            if (Object.hasOwn(result, 'errors')) {
                formStatus.innerHTML = `<span class="text-red-500">${result["errors"].map(error => error["message"]).join(", ")}</span>`
            } else {
                formStatus.innerHTML = '<span class="text-red-500">Oops! Ha ocurrido un error al enviar el formulario.</span>';
            }
        }
    } catch (error) {
        formStatus.innerHTML = '<span class="text-red-500">Oops! Ha ocurrido un error de conexión.</span>';
    }
}

form.addEventListener("submit", handleSubmit);
