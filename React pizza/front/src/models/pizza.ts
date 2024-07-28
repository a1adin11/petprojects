export interface Pizza {
  id: string;
  url: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
  category: number;
  rating: number[];
  isLoadingReady: boolean;
  onPluse: void;
}
