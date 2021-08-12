import { ICatalogItem } from '~/models/ICatalogItem';

export const itemFormat = (item: any): ICatalogItem => ({
  id: item.id,
  name: item.name,
  category: {
    id: item.set.id,
    name: item.set.name
  },
  image: item.images.small,
  largeImage: item.images.large,
  level: item.level || 'Unknown',
  hp: item.hp || 'Unknown',
  types: item.types,
  evolvesTo: item.evolvesTo,
  attacks: item.attacks,
  weaknesses: item.weaknesses,
  price: item.cardmarket.prices.trendPrice || 9999.99
});
