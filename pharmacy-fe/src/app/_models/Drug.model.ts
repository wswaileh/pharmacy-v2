import { BillItem } from './Bill-item.model';

export interface Drug {
  barcode: number;
  name: string;
  cost_price: number;
  selling_price: number;
  quantity?: number;
  company?: string;
  expiry?: string;
}

export function toBillItem(drug: Drug) {
  return {
    barcode: drug.barcode,
    name: drug.name,
    price: drug.selling_price,
    quantity: 1
  } as BillItem;
}
