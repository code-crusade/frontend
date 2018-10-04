// tslint:disable:prefer-template
import * as faker from 'faker';
import { SupportedLanguages } from '../../config/enums';
import { Exercise } from '../../modules/exercises/models';
import { Omit } from '../../types/types';

const ids: { [key: string]: string } = {
  A: '96aa97d6-1ed6-4454-b563-b8cd0ef65a2c',
  B: '2342b24e-e852-48fa-892f-95ddbb0b97a3',
};

const partialResources: {
  [key: string]: Omit<Exercise, 'title' | 'templates'>;
} = {};

Object.keys(ids).forEach((key) => {
  partialResources[key] = {
    description: { fr: faker.lorem.paragraph(), en: faker.lorem.paragraph() },
    id: ids[key],
    unitTests: [faker.commerce.product(), faker.commerce.color()],
  };
});

const resources: { [key: string]: Exercise } = {
  A: {
    ...partialResources.A,
    title: {
      en: 'Longest Substring Without Repeating Characters',
      fr: 'Sous-chaîne la plus longue sans caractères répétés',
    },
    templates: {
      [SupportedLanguages.Python]: 'def maxSequence(arr):\n' + '   return 4\n',
      [SupportedLanguages.Java]:
        'public class Max {\n' +
        '  public static int sequence(int[] arr) {\n' +
        '    return 4;\n' +
        '  }\n' +
        '}\n',
      [SupportedLanguages.Cpp]: '',
      [SupportedLanguages.CSharp]: '',
    },
  },
  B: {
    ...partialResources.B,
    title: {
      en: 'Median of Two Sorted Arrays',
      fr: 'Médiane de deux tableaux triés',
    },
    templates: {
      [SupportedLanguages.Python]: 'def maxSequence(arr):\n' + '   return 4\n',
      [SupportedLanguages.Java]:
        'public class Max {\n' +
        '  public static int sequence(int[] arr) {\n' +
        '    return 4;\n' +
        '  }\n' +
        '}\n',
      [SupportedLanguages.Cpp]: '',
      [SupportedLanguages.CSharp]: '',
    },
  },
};

const items: { [key: string]: Exercise } = Object.values(resources).reduce(
  (carry: object, resource: Exercise) => ({
    ...carry,
    [resource.id]: resource,
  }),
  {},
);

export const testExercises = {
  ids,
  items,
  resources,
};
