import { Drash } from "https://deno.land/x/drash/mod.ts";

// Init todo
let todos = [
  {
    "id": 1,
    "title": "Passer à Typescript",
    "completed": false,
  },
  {
    "id": 2,
    "title": "Créer une API REST",
    "completed": false,
  },
  {
    "id": 3,
    "title": "M'abonner à Devtheory",
    "completed": false,
  },
];

export class TodoList extends Drash.Http.Resource {
  static paths = ["/todos"];

  // Get all items in todo
  public GET() {
    this.response.body = todos;
    return this.response;
  }

  // Post new item with params
  public POST() {
    // Prepare request with params
    const t = {
      id: Math.floor(Math.random() * Math.floor(321321)),
      title: this.request.getBodyParam("title"),
      completed: this.request.getBodyParam("completed"),
    };
    // Push it in todo list
    todos.push(t);

    this.response.body = t;
    return this.response;
  }
}

export class TodoElement extends Drash.Http.Resource {
  static paths = ["/todos/:id"];

  // Get only one item with id param
  public GET() {
    // get id and find it in the todo list
    const URL_param = this.request.getPathParam("id");
    const t = todos.find((t) => t.id == URL_param);

    // if doesn't exist return an error message
    if (!t) {
      throw new Drash.Exceptions.HttpException(
        404,
        `Todo with id ${URL_param} not found`,
      );
    }
    this.response.body = t;
    return this.response;
  }

  // Delete an item with id param
  public DELETE() {
    // get id and find it in the todo list
    const URL_param = this.request.getPathParam("id");
    const t = todos.find((t) => t.id == URL_param);

    // if doesn't exist return an error message
    if (!t) {
      throw new Drash.Exceptions.HttpException(
        404,
        `Todo with id ${URL_param} not found`,
      );
    }

    // If exist then filter to remove it
    todos = todos.filter((t) => t.id != URL_param);
    this.response.body = "DELETED OK";
    return this.response;
  }

  // edit an item with the param id
  public PUT() {
    // get id and find it in the todo list
    const URL_param = this.request.getPathParam("id");
    const t = todos.find((t) => t.id == URL_param);

    // if doesn't exist return an error message
    if (!t) {
      throw new Drash.Exceptions.HttpException(
        404,
        `Todo with id ${URL_param} not found`,
      );
    }

    // with param who has been changed we can edit the item
    t.completed = this.request.getBodyParam("completed");
    this.response.body = t;
    return this.response;
  }
}