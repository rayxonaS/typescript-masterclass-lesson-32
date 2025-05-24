import { DataResource } from "../services/DataResource";
import { Pizza, PizzaModel } from "../model/model";
const root = document.querySelector(".root")!;

function createPizzaTemplate(pizza: PizzaModel): string {
  return `
        <div class="pizza">
          <h2 class="title">${pizza.title}</h2>
          <p class="decription">${pizza.description}</p>
          <span>$${pizza.price}</span>
          <div class="toppings">${pizza.toppings.toString()}</div>
         <button class="edit-btn" data-id="${pizza.id}">Edit</button>
          <button class="delete-btn" data-id="${pizza.id}">Delete</button>
        </div>
    `;
}

function renderTemplate(createdPizzas: string[], root: Element) {
  const template = document.createElement("template") as HTMLTemplateElement;

  for (let t of createdPizzas) {
    template.innerHTML += t;
  }

  root.append(template.content);
}

document.addEventListener("DOMContentLoaded", async () => {
  const pizzas = await Pizza.loadAll();
  const createdPizzas = pizzas.map(createPizzaTemplate);
  renderTemplate(createdPizzas, root);
});

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains("edit-btn")) {
    const id = target.getAttribute("data-id");
    if (id) {
      window.location.href = `./edit.html?id=${id}`;
    }
  }

  if (target.classList.contains("delete-btn")) {
    const id = target.getAttribute("data-id");
    if (id && confirm("Are you sure you want to delete this pizza?")) {
      Pizza.delete(id).then(() => {
        window.location.reload();
      });
    }
  }
});
