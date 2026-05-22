import { FamilyTree } from "../domain/services/FamilyTree";
import { Gender } from "../domain/enums/Gender";
import { Person } from "../domain/models/Person";

describe('Add Child', () => {
    let tree: FamilyTree;

    beforeEach(() => {
        tree = new FamilyTree();

        const mother = new Person('Jane', Gender.FEMALE);
        tree.addMember(mother);
    });

    it('should add child successfully', () => {
        const result = tree.addChild('Jane', 'Alice', Gender.FEMALE);

        expect(result).toBe('CHILD_ADDED');
    });

    it ('should fail when mother not found', () => {
        const result = tree.addChild('Unknown', 'Alice', Gender.FEMALE);

        expect(result).toBe('PERSON_NOT_FOUND');
    });
});
