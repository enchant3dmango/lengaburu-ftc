import { Gender } from '../enums/Gender';
import { Person } from '../models/Person';
import { AddChildResult } from '../enums/AddChildResult';

export class FamilyTree {
  private readonly members = new Map<string, Person>();

  addMember(person: Person): void {
    this.members.set(person.name, person);
  }

  findMember(name: string): Person | undefined {
    return this.members.get(name);
  }

  addChild(
    motherName: string,
    childName: string,
    gender: Gender
  ): AddChildResult {
    const mother = this.findMember(motherName);

    if (!mother) {
      return AddChildResult.PERSON_NOT_FOUND;
    }

    if (mother.gender !== Gender.FEMALE) {
      return AddChildResult.CHILD_ADDITION_FAILED;
    }

    if (this.members.has(childName)) {
      return AddChildResult.CHILD_ADDITION_FAILED;
    }

    const child = new Person(childName, gender);

    mother.addChild(child);

    this.addMember(child);

    return AddChildResult.CHILD_ADDED;
  }
}
