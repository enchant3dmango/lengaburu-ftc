import { FamilyTree } from './domain/services/FamilyTree';
import { RelationshipResolver } from './domain/services/RelationshipResolver';
import { CommandProcessor } from "./cli/CommandProcessor";
import { seedFamily } from "./data/seedFamily";

const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: npm run dev <input-file>');
  process.exit(1);
}

const tree = new FamilyTree();

seedFamily(tree);

const resolver = new RelationshipResolver(tree);
const processor = new CommandProcessor(tree, resolver);

processor.processFile(filePath);
