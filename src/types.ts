export type CategoryType = {
  id: number,
  documentId: string,
  Title: string,
  createdAt: string,
  publishedAt: string,
}

export type BlogType = {
  id: number;
  documentId: string;
  Title: string;
  Description: {
    type: string;
    children: {
      text: string;
      type: string;
    }[];
  }[];
  publishedAt: string;
  img: {
    url: string;
    name: string;
  };
  categories: {
    Title: string;
  }[];
};
