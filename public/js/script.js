const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");

  const expanded = nav.classList.contains("active");

  menuToggle.setAttribute("aria-expanded", expanded);
  menuToggle.textContent = expanded ? "✕" : "☰";
});
