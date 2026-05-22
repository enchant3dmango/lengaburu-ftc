import fs from 'fs';
import { FamilyTree } from '../domain/services/FamilyTree';
import { RelationshipResolver } from '../domain/services/RelationshipResolver';
import { Gender, isGender } from '../domain/enums/Gender';
import { Relationship, isRelationship } from '../domain/enums/Relationship';

export class CommandProcessor {
  constructor(
    private readonly tree: FamilyTree,
    private readonly resolver: RelationshipResolver
  ) {}

  processFile(filePath: string): void {
    const content = fs.readFileSync(filePath, 'utf-8');

    const lines = content
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    for (const line of lines) {
      this.processLine(line);
    }
  }

  processLine(line: string): void {
    const tokens = line.split(' ');
    const command = tokens[0];

    switch (command) {
      case 'ADD_CHILD': {
        if (tokens.length !== 4) {
          console.log('INVALID_COMMAND');
          return;
        }
        const [_, motherName, childName, genderValue] = tokens;

        if (!isGender(genderValue)) {
          console.log('INVALID_GENDER');
          return;
        }

        const result = this.tree.addChild(
          motherName,
          childName,
          genderValue
        );

        console.log(result);
        break;
      }

      case 'GET_RELATIONSHIP': {
        if (tokens.length !== 3) {
          console.log('INVALID_COMMAND');
          return;
        }
        const [_, name, relationshipName] = tokens;

        if (!isRelationship(relationshipName)) {
          console.log('NONE');
          return;
        }

        const result = this.resolver.getRelationship(
          name,
          relationshipName
        );

        console.log(result.length ? result.join(' ') : 'NONE');
        break;
      }

      default:
        console.log('INVALID_COMMAND');
    }
  }
}
