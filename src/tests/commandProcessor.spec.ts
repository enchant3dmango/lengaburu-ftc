import { FamilyTree } from "../domain/services/FamilyTree";
import { RelationshipResolver } from "../domain/services/RelationshipResolver";
import { CommandProcessor } from "../cli/CommandProcessor";
import { seedFamily } from "../data/seedFamily";

describe('Command Processor', () => {
    let processor: CommandProcessor;

    beforeEach(() => {
        const tree = new FamilyTree();
        seedFamily(tree);

        const resolver = new RelationshipResolver(tree);
        processor = new CommandProcessor(tree, resolver);
    });

    it('should process add child command', () => {
        const spy = jest.spyOn(console, 'log').mockImplementation();

        processor.processLine('ADD_CHILD Flora Molly Female');
        expect(spy).toHaveBeenCalledWith('CHILD_ADDED');
        spy.mockRestore();
    });
});
