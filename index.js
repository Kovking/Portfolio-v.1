

const dataSearch = document.querySelector('[data-search]');
const userCardContainer = document.querySelector('[data-user-cards-container]');
const userCardTemplate = document.querySelector('[data-user-template]');

// Cache et montre les pages
function showPage(page, event) {
  document.querySelectorAll(".page").forEach((p) => {
    p.classList.add("d-none");
  });

  document.getElementById(page).classList.remove("d-none");

  document.querySelectorAll(".nav-btn").forEach((b) => {
    b.classList.remove("active");
  });

  // event existe seulement quand appelé depuis un clic
  if (event) {
    event.target.classList.add("active");
  } else {
    // Active le bon bouton sidebar au chargement initial
    const btn = document.querySelector(`[onclick*="'${page}'"]`);
    if (btn) btn.classList.add("active");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  showPage("dashboard");
});

// Telecharge CV

function CV() {
  const a = document.createElement('a');
  a.href = 'CV-KevinXU.pdf';
  a.download = 'CV-KevinXU.pdf';
  a.click();

}



// contact form

const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "7e96dad0-fff5-4785-b17e-651cf9cb82f2");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});


// Search Bar in porject

let jobs = []

dataSearch.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    jobs.forEach(user => {
        const isVisible =
            user.name.toLowerCase().includes(value) ||
            user.speciality.toLowerCase().includes(value);

        user.element.classList.toggle("hide", !isVisible);
    });
});

fetch("data.json")
    .then(res => res.json())
    .then(data => {
        jobs = data.map(user => {
            const card = userCardTemplate.content.cloneNode(true).children[0]
            const name = card.querySelector("[name]")
            const description = card.querySelector("[description]")
            const speciality = card.querySelector("[speciality]")

            name.textContent = user.name
            description.textContent = user.description
            speciality.textContent = user.speciality 
            userCardContainer.appendChild(card)

            return {name: user.name, description: user.description, speciality:user.speciality, element: card} 
        })
})