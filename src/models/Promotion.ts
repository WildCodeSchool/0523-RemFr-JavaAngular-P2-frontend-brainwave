export class Promotion {
  constructor(
    public id: string,
    public name: string,
    public tag: string,
    public authorId: string,
    public description: string,
    public picture: string,
    public creationDate: Date,
    public participantsIds: string[],
    public resourceIds: string[],
    public topicIds: string[]
  ) {}
}
