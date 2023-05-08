import { ExtraType } from "../utils/types";

export default class MenuExtra {
    id: string;
    description: string;
    amount: number;
    type: ExtraType;
    menuId: string;
  
    constructor(description: string, amount: number, type: ExtraType, menuId: string) {
      this.description = description;
      this.amount = amount;
      this.type = type;
      this.menuId = menuId;
    }
  }
  