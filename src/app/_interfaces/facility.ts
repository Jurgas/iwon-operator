import {CategoryEnum} from '../_enums/category.enum';

export interface Facility {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  voivodeship: string;
  district: string;
  name: string;
  category: CategoryEnum;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
}
