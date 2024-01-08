import { IBaseModel } from './base.model';
import { IPharmacist } from './pharmacist.model';
import { BillItem, IBillItemDTO } from './bill-item.model';

export interface IBillWriteDTO {
  id: string;
  pharmacist: IPharmacist;
  time: number;
  total: number;
  items: IBillItemDTO[];
  discountPercentage: number;
  discountAmount: number;
}

export interface IBillReadDTO {
  id: string;
  pharmacist: IPharmacist;
  time: number;
  total: number;
  items: BillItem[];
  discountPercentage: number;
  discountAmount: number;
}

export class Bill implements IBaseModel<IBillReadDTO, IBillWriteDTO> {
  ID_ATTR_NAME = 'id';

  id: string | undefined;
  pharmacist: IPharmacist | undefined;
  time: number | undefined;
  total: number | undefined;
  items: BillItem[];
  discountPercentage: number | undefined;
  discountAmount: number | undefined;

  constructor(){
    this.items = [] as BillItem[];
  }

  calculateTotal() {
    let total = 0;
    if (this.items){
      this.items.forEach(product => {
        total += (+(product.price ?? 0) * +(product.quantity ?? 0));
      });
      if (this.discountPercentage && this.discountPercentage !== 0) {
        total = total * (1 - (this.discountPercentage / 100));
      }
      if (this.discountAmount && this.discountAmount !== 0) {
        total -= this.discountAmount;
      }
    }
    this.total = total;
    return this.total;
  }

  fromDTO(input: IBillReadDTO){
    this.id = input.id;
    this.pharmacist = input.pharmacist;
    this.time = input.time;
    this.total = input.total;
    this.items = input.items;
    this.discountPercentage = input.discountPercentage ? input.discountPercentage : 0;
    this.discountAmount = input.discountAmount ? input.discountAmount : 0;
    return this;
  }

  toDTO(){
    return {
      pharmacist: this.pharmacist,
      time: this.time,
      items: this.items.map(item => item.toDTO()),
      discountPercentage: this.discountPercentage ? this.discountPercentage : 0,
      discountAmount: this.discountAmount ? this.discountAmount : 0
    } as IBillWriteDTO;
  }

  clone(){
    const x = new Bill();
    x.id = this.id;
    x.items = this.items;
    x.pharmacist = this.pharmacist;
    x.time = this.time;
    x.total = this.total;
    x.discountAmount = this.discountAmount;
    x.discountPercentage = this.discountPercentage;
    return x;
  }
}
