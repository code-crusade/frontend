// tslint:disable:prefer-template
// tslint:disable:no-duplicate-string
import * as faker from 'faker';
import {
  Difficulties,
  Exercise,
  SupportedLanguages,
  SupportedType,
} from '../../__generated__/api';
import { Omit } from '../../types/types';

const ids: { [key: string]: number } = {
  A: 1,
  B: 2,
  C: 3,
};

const partialResources: {
  [key: string]: Omit<Exercise, 'title' | 'template' | 'sampleTestCases'>;
} = {};

Object.keys(ids).forEach((key) => {
  partialResources[key] = {
    difficulty: Difficulties.MEDIUM,
    description: { fr: faker.lorem.paragraph(), en: faker.lorem.paragraph() },
    id: ids[key],
  };
});

const resources: { [key: string]: Exercise } = {
  A: {
    ...partialResources.A,
    title: {
      en: 'Longest Substring Without Repeating Characters',
      fr: 'Sous-chaîne la plus longue sans caractères répétés',
    },
    template: {
      className: 'LengthOfLongestSubstring',
      functionName: 'lengthOfLongestSubstring',
      functionReturnValue: 4,
      functionReturnType: SupportedType.INT,
      params: [{ name: 's', type: SupportedType.STRING }],
      appendedCode: Object.values(SupportedLanguages).reduce(
        (carry, lang) => ({ ...carry, [lang]: '' }),
        {},
      ),
      prependedCode: Object.values(SupportedLanguages).reduce(
        (carry, lang) => ({ ...carry, [lang]: '' }),
        {},
      ),
    },
    sampleTestCases: [
      {
        it: 'Example tests',
        assertions: [
          {
            inputArguments: [
              {
                type: SupportedType.STRING,
                value: 'abcabcbb',
              },
            ],
            expectedOutput: {
              type: SupportedType.INT,
              value: 3,
            },
          },
          {
            inputArguments: [
              {
                type: SupportedType.STRING,
                value: 'bbbbb',
              },
            ],
            expectedOutput: {
              type: SupportedType.INT,
              value: 1,
            },
          },
          {
            inputArguments: [
              {
                type: SupportedType.STRING,
                value: 'pwwkew',
              },
            ],
            expectedOutput: {
              type: SupportedType.INT,
              value: 3,
            },
          },
        ],
      },
    ],
  },
  B: {
    ...partialResources.B,
    title: {
      en: 'Median of Two Sorted Arrays',
      fr: 'Médiane de deux tableaux triés',
    },
    template: {
      className: 'FindMedianSortedArrays',
      functionName: 'findMedianSortedArrays',
      functionReturnValue: 2.6,
      functionReturnType: SupportedType.FLOAT,
      params: [
        { name: 'nums1', type: SupportedType.INTARRAY },
        { name: 'nums2', type: SupportedType.INTARRAY },
      ],
      appendedCode: Object.values(SupportedLanguages).reduce(
        (carry, lang) => ({ ...carry, [lang]: '' }),
        {},
      ),
      prependedCode: Object.values(SupportedLanguages).reduce(
        (carry, lang) => ({ ...carry, [lang]: '' }),
        {},
      ),
    },
    sampleTestCases: [
      {
        it: 'Example tests',
        assertions: [
          {
            inputArguments: [
              {
                type: SupportedType.INTARRAY,
                value: [1, 3],
              },
              {
                type: SupportedType.INTARRAY,
                value: [2],
              },
            ],
            expectedOutput: {
              type: SupportedType.FLOAT,
              value: 2.0,
            },
          },
          {
            inputArguments: [
              {
                type: SupportedType.INTARRAY,
                value: [1, 2],
              },
              {
                type: SupportedType.INTARRAY,
                value: [3, 4],
              },
            ],
            expectedOutput: {
              type: SupportedType.FLOAT,
              value: 2.5,
            },
          },
        ],
      },
    ],
  },
  C: {
    ...partialResources.C,
    title: {
      en: 'Highest Scoring Word',
      fr: 'Mot ayant le plus haut score',
    },
    template: {
      className: 'Kata',
      functionName: 'high',
      functionReturnValue: '',
      functionReturnType: SupportedType.STRING,
      params: [{ name: 's', type: SupportedType.STRING }],
      appendedCode: Object.values(SupportedLanguages).reduce(
        (carry, lang) => ({ ...carry, [lang]: '' }),
        {},
      ),
      prependedCode: Object.values(SupportedLanguages).reduce(
        (carry, lang) => ({ ...carry, [lang]: '' }),
        {},
      ),
    },
    sampleTestCases: [
      {
        it: 'Example tests',
        assertions: [
          {
            inputArguments: [
              {
                type: SupportedType.STRING,
                value: 'man i need a taxi up to ubud',
              },
            ],
            expectedOutput: {
              type: SupportedType.STRING,
              value: 'taxi',
            },
          },
          {
            inputArguments: [
              {
                type: SupportedType.STRING,
                value: 'what time are we climbing up to the volcano',
              },
            ],
            expectedOutput: {
              type: SupportedType.STRING,
              value: 'volcano',
            },
          },
          {
            inputArguments: [
              {
                type: SupportedType.STRING,
                value: 'take me to semynak',
              },
            ],
            expectedOutput: {
              type: SupportedType.STRING,
              value: 'semynak',
            },
          },
        ],
      },
    ],
  },
};

const items: { [key: number]: Exercise } = Object.values(resources).reduce(
  (carry: object, resource: Exercise) => ({
    ...carry,
    [resource.id]: resource,
  }),
  {},
);

const add = (formValues: Omit<Exercise, 'id'>) => {
  const id = Object.values(items).length + 1;
  const newItem = { ...formValues, id };

  items[id] = newItem;

  return newItem;
};

export const testExercises = {
  add,
  ids,
  items,
  resources,
};
