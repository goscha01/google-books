export class Book {
  constructor(
    public id: number,
    public bookid: string,
    public title: string,
    public subtitle: string,
    public authors: string,
    public descr : string,
    public categories: string,
    public pablisher: string,
    public publisherDate: string,
    public previewLink: string,
    public coverImage: string,
    public searchword: string,
    public tstmp: string,
    public favorite: boolean
  ){}
}
