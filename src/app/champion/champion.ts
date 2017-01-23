export class Weapon {
  id: number;
  name: string;
  attack: number;
  durability: number;
}

export class Champion {
  id: number;
  name: string;
  lives: number;
  weapon: Weapon;
}
