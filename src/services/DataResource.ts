export class DataResource<T> {
  constructor(private endpoint: string) {}

  async loadAll(): Promise<T[]> {
    const req = await fetch(this.endpoint);
    const data = await req.json();
    return data;
  }

  async delete(id: string) {
    const req = await fetch(`${this.endpoint} / ${id}`, {
      method: "DELETE",
    });

    return req.json();
  }

  async create(pizza: T) {
    const req = await fetch(`${this.endpoint}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(pizza),
    });

    return req.json();
  }

  async LoadOne(id: string) {
    const req = await fetch(`${this.endpoint}/${id}`);
    return req.json();
  }

  async update(pizza: T) {
    const req = await fetch(`${this.endpoint}`, {
      method: "PUt",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(pizza),
    });

    return req.json();
  }
}
