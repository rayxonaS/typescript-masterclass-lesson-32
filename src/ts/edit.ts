import { Pizza, PizzaModel } from "../model/model";

const form = document.querySelector(".create") as HTMLFormElement;
const id = new URLSearchParams(window.location.search).get("id");

if (!id) {
  alert("Invalid ID");
  window.location.href = "/";
}

Pizza.LoadOne(id).then((pizza: PizzaModel) => {
  (form.querySelector("[name='title']") as HTMLInputElement).value =
    pizza.title;
  (form.querySelector("[name='description']") as HTMLTextAreaElement).value =
    pizza.description;
  (form.querySelector("[name='price']") as HTMLInputElement).value =
    pizza.price.toString();

  const selected = pizza.toppings.split(",");
  selected.forEach((t) => {
    const checkbox = form.querySelector(
      `input[value="${t.trim()}"]`
    ) as HTMLInputElement;
    if (checkbox) checkbox.checked = true;
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const updatedPizza: PizzaModel = {
    id: Number(id),
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    toppings: (formData.getAll("toppings") as string[]).join(","),
    price: parseInt(formData.get("price") as string),
  };

  Pizza.update(Number(id), updatedPizza).then(() => {
    window.location.href = "/";
  });
});
