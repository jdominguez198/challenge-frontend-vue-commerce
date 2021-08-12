export interface ICatalogCategory {
  id: string;
  name: string;
  series: string;
  image: string;
  page?: number;
  totalCount?: number;
  totalPages?: number;
  pages?: any;
}
