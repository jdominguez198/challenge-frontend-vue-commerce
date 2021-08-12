import { ICatalogCategory } from '~/models/ICatalogCategory';

export const categoryFormat = (item: any): ICatalogCategory => ({
  id: item.id,
  name: item.name,
  series: item.series,
  image: item.images.logo
});
