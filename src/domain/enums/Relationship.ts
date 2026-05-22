export enum Relationship {
  SON = 'Son',
  DAUGHTER = 'Daughter',
  SIBLINGS = 'Siblings',
  BROTHER_IN_LAW = 'Brother-In-Law',
  SISTER_IN_LAW = 'Sister-In-Law',
  MATERNAL_UNCLE = 'Maternal-Uncle',
  MATERNAL_AUNT = 'Maternal-Aunt',
  PATERNAL_UNCLE = 'Paternal-Uncle',
  PATERNAL_AUNT = 'Paternal-Aunt'
}

export function isRelationship(
  value: string
): value is Relationship {
  return Object.values(Relationship).includes(
    value as Relationship
  );
}
