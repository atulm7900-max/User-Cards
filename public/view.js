const cards = document.querySelectorAll(".my-card");

for (let card of cards) {
  card.addEventListener("click", async () => {
    let id = card.getAttribute("id");

    window.location.href = `http://localhost:3000/users/${id}`;
  });
}
