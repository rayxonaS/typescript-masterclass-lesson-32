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
          <button>Delete</button>
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

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = (e.target as HTMLElement).getAttribute("data-id");
      if (id) {
        window.location.href = `./edit.html?id=${id}`;
      }
    });
  });
});
