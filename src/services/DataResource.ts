export class DataResource<T> {
  constructor(private endpoint: string) {}

  async loadAll(): Promise<T[]> {
    const req = await fetch(this.endpoint);
    const data = await req.json();
    return data;
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

  async update(id: number, updated: T): Promise<T> {
    const res = await fetch(`${this.endpoint}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    });
    return res.json();
  }

  async delete(id: string) {
    const req = await fetch(`${this.endpoint}/${id}`, {
      method: "DELETE",
    });
    return req.json();
  }
}
