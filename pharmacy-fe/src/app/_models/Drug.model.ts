import { BillItem } from './bill-item.model';
import { IBaseModel } from './base.model';
export interface IDrugDTO {
  id: string;
  barcode: number;
  name: string;
  costPrice: number;
  sellingPrice: number;
  quantity?: number;
  company?: string;
  expiry?: string;
}
export class Drug implements IBaseModel<IDrugDTO, IDrugDTO> {
  ID_ATTR_NAME = 'barcode';

  id: string;
  barcode: number;
  name: string;
  costPrice: number;
  sellingPrice: number;
  quantity?: number;
  company?: string;
  expiry?: string;

  fromDTO(drug: IDrugDTO) {
    this.id = drug.id;
    this.barcode = drug.barcode;
    this.name = drug.name;
    this.company = drug.company;
    this.costPrice = drug.costPrice;
    this.sellingPrice = drug.sellingPrice;
    this.quantity = drug.quantity;
    this.expiry = drug.expiry;

    return this;
  }

  toDTO() {
    return {
      id: this.id,
      barcode: this.barcode,
      name: this.name,
      costPrice: this.costPrice,
      sellingPrice: this.sellingPrice,
      quantity: this.quantity,
      company: this.company,
      expiry: this.expiry
    } as IDrugDTO;
  }

  toBillItem() {
    const billItem = new BillItem();
    billItem.price = this.sellingPrice;
    billItem.quantity = 1;
    billItem.drug = this;
    return billItem;
  }

  clone() {
    const x = new Drug();
    x.id = this.id;
    x.barcode = this.barcode;
    x.name = this.name;
    x.costPrice = this.costPrice;
    x.sellingPrice = this.sellingPrice;
    x.quantity = this.quantity;
    x.company = this.company;
    x.expiry = this.expiry;
    return x;
  }
}
