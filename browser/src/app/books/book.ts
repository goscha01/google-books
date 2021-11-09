export class Book {
  constructor(
    public title: string,
    public subtitle: string,
    public authors: string[],
    public description : string,
    public categories: string [],
    public pablisher: string,
    public publisherDate: string,
    public previewLink: string,
    public coverImage: string
  ){}
}
