import { Relationship } from '../enums/Relationship';
import { Gender } from '../enums/Gender';
import { Person } from '../models/Person';
import { FamilyTree } from './FamilyTree';

export class RelationshipResolver {
  constructor(private readonly familyTree: FamilyTree) {}

  getRelationship(name: string, relationship: Relationship): string[] {
    const person = this.familyTree.findMember(name);

    if (!person) {
      return ['PERSON_NOT_FOUND'];
    }

    switch (relationship) {
      case Relationship.SON:
        return this.getChildrenByGender(person, Gender.MALE);

      case Relationship.DAUGHTER:
        return this.getChildrenByGender(person, Gender.FEMALE);

      case Relationship.SIBLINGS:
        return person.getSiblings().map(p => p.name);

      case Relationship.BROTHER_IN_LAW:
        return this.getBrotherInLaw(person);

      case Relationship.SISTER_IN_LAW:
        return this.getSisterInLaw(person);

      case Relationship.MATERNAL_UNCLE:
        return this.getMaternalUncle(person);

      case Relationship.MATERNAL_AUNT:
        return this.getMaternalAunt(person);

      case Relationship.PATERNAL_UNCLE:
        return this.getPaternalUncle(person);

      case Relationship.PATERNAL_AUNT:
        return this.getPaternalAunt(person);

      default:
        return ['NONE'];
    }
  }

  private getChildrenByGender(person: Person, gender: Gender): string[] {
    return person.children
      .filter(child => child.gender === gender)
      .map(child => child.name);
  }

  private getBrotherInLaw(person: Person): string[] {
    const result = new Set<string>();

    person.getSiblings()
      .filter(sibling => sibling.gender === Gender.FEMALE)
      .forEach(sibling => {
        if (sibling.spouse) {
          result.add(sibling.spouse.name);
        }
      });

    if (person.spouse) {
      person.spouse
        .getSiblings()
        .filter(sibling => sibling.gender === Gender.MALE)
        .forEach(sibling => result.add(sibling.name));
    }

    return [...result];
  }

  private getSisterInLaw(person: Person): string[] {
    const result = new Set<string>();

    person.getSiblings()
      .filter(sibling => sibling.gender === Gender.MALE)
      .forEach(sibling => {
        if (sibling.spouse) {
          result.add(sibling.spouse.name);
        }
      });

    if (person.spouse) {
      person.spouse
        .getSiblings()
        .filter(sibling => sibling.gender === Gender.FEMALE)
        .forEach(sibling => result.add(sibling.name));
    }

    return [...result];
  }

  private getMaternalUncle(person: Person): string[] {
    return this.getParentSiblings(person.mother, Gender.MALE);
  }

  private getMaternalAunt(person: Person): string[] {
    return this.getParentSiblings(person.mother, Gender.FEMALE);
  }

  private getPaternalUncle(person: Person): string[] {
    return this.getParentSiblings(person.father, Gender.MALE);
  }

  private getPaternalAunt(person: Person): string[] {
    return this.getParentSiblings(person.father, Gender.FEMALE);
  }

  private getParentSiblings(
    parent: Person | undefined,
    gender: Gender
  ): string[] {
    if (!parent) {
      return [];
    }

    return parent
      .getSiblings()
      .filter(sibling => sibling.gender === gender)
      .map(sibling => sibling.name);
  }
}
