const form = document.querySelector(".create") as HTMLFormElement;
import { Pizza, PizzaModel } from "../model/model";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const title = formData.get("title");
  const description = formData.get("description");
  const toppings = formData.getAll("toppings");
  const price = Number(formData.get("price"));

  if (
    typeof title == "string" &&
    typeof description == "string" &&
    Array.from(toppings) &&
    typeof price == "number"
  ) {
    Pizza.create({ title, description, toppings, price })
      .then(() => {
        window.location.href = "/";
      })
      .catch(() => {});
  }
});
