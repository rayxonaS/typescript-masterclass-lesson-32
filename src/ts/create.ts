const form = document.querySelector(".create") as HTMLFormElement;
import { Pizza, PizzaModel } from "../model/model";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const newPizza: PizzaModel = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    toppings: formData.getAll("toppings") as string[],
    price: parseInt(formData.get("price") as string),
  };

  Pizza.create(newPizza)
    .then(() => {
      window.location.href = "/";
    })
    .catch(() => {});
});
