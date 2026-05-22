export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female'
}

export function isGender(
  value: string
): value is Gender {
  return Object.values(Gender).includes(
    value as Gender
  );
}
