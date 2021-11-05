export class Book {
  constructor(
    public tirle: string,
    public subtitle: string,
    public authors: string[],
    public sescription : string,
    public categories: string [],
    public pablisher: string,
    public publisherDate: Date,
    public previewLink: string,
    public coverImage: string
  ){}
}
