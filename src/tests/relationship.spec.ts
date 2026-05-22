import { FamilyTree } from "../domain/services/FamilyTree";
import { RelationshipResolver } from "../domain/services/RelationshipResolver";
import { Relationship } from "../domain/enums/Relationship";
import { seedFamily } from "../data/seedFamily";

describe('Relationship Resolver', () => {
    let tree: FamilyTree;
    let resolver: RelationshipResolver;

    beforeEach(() => {
        tree = new FamilyTree();
        seedFamily(tree);

        resolver = new RelationshipResolver(tree);
    });

    it('should get sons', () => {
        const result = resolver.getRelationship(
            'Queen-Margaret',
            Relationship.SON
        );

        expect(result).toEqual([
            'Bill',
            'Charlie',
            'Percy',
            'Ronald'
        ]);
    });

    it('should get daughters', () => {
        const result = resolver.getRelationship(
            'Queen-Margaret',
            Relationship.DAUGHTER
        );

        expect(result).toEqual(['Ginerva']);
    });

    it('should return none for unknown relationships', () => {
        const result = resolver.getRelationship(
            'Nobody',
            Relationship.SON
        );

        expect(result).toEqual(['PERSON_NOT_FOUND']);
    });
});
