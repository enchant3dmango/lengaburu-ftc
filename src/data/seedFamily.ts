import { FamilyTree } from '../domain/services/FamilyTree';
import { Gender } from '../domain/enums/Gender';
import { Person } from '../domain/models/Person';

export function seedFamily(tree: FamilyTree): void {
  const kingArthur = new Person('King-Arthur', Gender.MALE);
  const queenMargaret = new Person('Queen-Margaret', Gender.FEMALE);

  kingArthur.marry(queenMargaret);

  tree.addMember(kingArthur);
  tree.addMember(queenMargaret);

  const bill = new Person('Bill', Gender.MALE);
  const charlie = new Person('Charlie', Gender.MALE);
  const percy = new Person('Percy', Gender.MALE);
  const ronald = new Person('Ronald', Gender.MALE);
  const ginerva = new Person('Ginerva', Gender.FEMALE);

  queenMargaret.addChild(bill);
  queenMargaret.addChild(charlie);
  queenMargaret.addChild(percy);
  queenMargaret.addChild(ronald);
  queenMargaret.addChild(ginerva);

  [bill, charlie, percy, ronald, ginerva].forEach(member => {
    tree.addMember(member);
  });

  const flora = new Person('Flora', Gender.FEMALE);
  bill.marry(flora);

  tree.addMember(flora);

  tree.addChild('Flora', 'Victoire', Gender.FEMALE);
  tree.addChild('Flora', 'Dominique', Gender.FEMALE);
  tree.addChild('Flora', 'Louis', Gender.MALE);
}
