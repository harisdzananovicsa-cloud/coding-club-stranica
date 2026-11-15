const forma = document.getElementById("prijava-forma");
const statusForme = document.getElementById("forma-status");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const pravila = {
  ime: (v) => (v.length < 3 ? "Upiši ime i prezime (najmanje 3 znaka)." : ""),
  email: (v) => (emailRegex.test(v) ? "" : "Upiši ispravnu email adresu, na primjer ime@skola.ba."),
  razred: (v) => (v === "" ? "Odaberi razred." : ""),
  poruka: (v) => (v.length < 10 ? "Napiši barem jednu rečenicu (najmanje 10 znakova)." : ""),
};

function provjeriPolje(polje) {
  const greska = pravila[polje.name](polje.value.trim());
  const grupa = polje.closest(".field");
  grupa.classList.toggle("invalid", greska !== "");
  grupa.querySelector(".error").textContent = greska;
  polje.setAttribute("aria-invalid", greska !== "" ? "true" : "false");
  return greska === "";
}

const polja = [...forma.querySelectorAll("input, select, textarea")];

polja.forEach((polje) => {
  polje.addEventListener("blur", () => provjeriPolje(polje));
  polje.addEventListener("input", () => {
    if (polje.closest(".field").classList.contains("invalid")) {
      provjeriPolje(polje);
    }
  });
});

forma.addEventListener("submit", (event) => {
  event.preventDefault();
  statusForme.textContent = "";

  const rezultati = polja.map(provjeriPolje);

  if (!rezultati.every(Boolean)) {
    polja[rezultati.indexOf(false)].focus();
    return;
  }

  const ime = forma.elements.ime.value.trim().split(" ")[0];
  statusForme.textContent = "Hvala, " + ime + "! Prijava je poslana, javit ćemo ti se uskoro.";
  forma.reset();
});

const prekidac = document.getElementById("nav-toggle");
const meni = document.getElementById("nav-links");

function postaviMeni(otvoren) {
  meni.classList.toggle("open", otvoren);
  prekidac.setAttribute("aria-expanded", String(otvoren));
  prekidac.setAttribute("aria-label", otvoren ? "Zatvori meni" : "Otvori meni");
}

prekidac.addEventListener("click", () => {
  postaviMeni(!meni.classList.contains("open"));
});

meni.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => postaviMeni(false));
});

