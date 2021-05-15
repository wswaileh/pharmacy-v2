import { Drug } from './drug.model';

export interface IBillItemDTO {
  drug: Drug;
  price: number;
  quantity: number;
}

export class BillItem {
  drug: Drug;
  price: number;
  quantity: number;

  toDTO() {
    return {
      drug: this.drug,
      price: this.price,
      quantity: this.quantity
    } as IBillItemDTO;
  }

  fromDTO(input: IBillItemDTO) {
    this.drug = input.drug;
    this.price = input.price;
    this.quantity = input.quantity;
  }

}
