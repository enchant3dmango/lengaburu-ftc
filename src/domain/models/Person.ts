import { Gender } from '../enums/Gender';

export class Person {
  public readonly children: Person[] = [];

  public mother?: Person;
  public father?: Person;
  public spouse?: Person;

  constructor(
    public readonly name: string,
    public readonly gender: Gender
  ) {}

  marry(partner: Person): void {
    this.spouse = partner;
    partner.spouse = this;
  }

  addChild(child: Person): void {
    this.children.push(child);

    child.mother = this.gender === Gender.FEMALE ? this : this.spouse;
    child.father = this.gender === Gender.MALE ? this : this.spouse;

    if (this.spouse) {
      this.spouse.children.push(child);
    }
  }

  getSiblings(): Person[] {
    if (!this.mother) {
      return [];
    }

    return this.mother.children.filter(
      sibling => sibling.name !== this.name
    );
  }
}
