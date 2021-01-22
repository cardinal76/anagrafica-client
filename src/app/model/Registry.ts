export class Registry {
  public name: string;
  public surname: string;

  public fromJSON(object: JSON) {
    this.name = object['name'];
    this.surname = object['surname'];
  }
}
