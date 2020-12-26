import { Drug } from './Drug.model';

export interface Bill {
  id: string;
  pharmacist: string;
  date: number;
  time: string;
  total: number;
  items: Drug[];
}
