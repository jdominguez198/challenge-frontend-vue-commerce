interface ICatalogItemCategory {
  id: string;
  name: string;
}

export interface ICatalogItem {
  id: string;
  name: string;
  category: ICatalogItemCategory;
  image: string;
  largeImage?: string;
  level: string;
  hp: string;
  price: number;
  types?: any;
  evolvesTo?: any;
  attacks?: any;
  weaknesses?: any;
  set?: any;
}
