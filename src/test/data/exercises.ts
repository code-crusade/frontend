// tslint:disable:prefer-template
// tslint:disable:no-duplicate-string
import * as faker from 'faker';
import * as uuid from 'uuid/v4';
import {
  Difficulties,
  FunctionReturnTypes,
  SupportedLanguages,
} from '../../config/enums';
import { Exercise } from '../../modules/exercises/models';
import { Omit } from '../../types/types';

const ids: { [key: string]: string } = {
  A: '1',
  B: '2',
  C: '3',
};

const partialResources: {
  [key: string]: Omit<Exercise, 'title' | 'template' | 'sampleTestCases'>;
} = {};

Object.keys(ids).forEach((key) => {
  partialResources[key] = {
    difficulty: Difficulties.MEDIUM,
    description: { fr: faker.lorem.paragraph(), en: faker.lorem.paragraph() },
    id: ids[key],
  } as any; // FIXME: property unitTest is missing
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
      functionReturnType: FunctionReturnTypes.INT,
      params: [{ name: 's', type: FunctionReturnTypes.STRING }],
      appendedCode: Object.values(SupportedLanguages).reduce(
        (carry, lang) => ({ ...carry, [lang]: '' }),
        {},
      ),
      prependedCode: Object.values(SupportedLanguages).reduce(
        (carry, lang) => ({ ...carry, [lang]: '' }),
        {},
      ),
    },
<<<<<<< HEAD
    unitTests: [
      {
        input: [
          {
            inputType: FunctionReturnTypes.STRING,
            inputValue: 'abcabcbb',
          },
        ],
        outputValue: 3,
      },
      {
        input: [
          {
            inputType: FunctionReturnTypes.STRING,
            inputValue: 'bbbbb',
          },
        ],
        outputValue: 1,
      },
      {
        input: [
          {
            inputType: FunctionReturnTypes.STRING,
            inputValue: 'pwwkew',
          },
        ],
        outputValue: 3,
=======
    sampleTestCases: [
      {
        it: 'Example tests',
        assertions: [
          {
            inputArguments: [
              {
                type: FunctionReturnTypes.STRING,
                value: 'abcabcbb',
              },
            ],
            expectedOutput: {
              type: FunctionReturnTypes.INT,
              value: 3,
            },
          },
          {
            inputArguments: [
              {
                type: FunctionReturnTypes.STRING,
                value: 'bbbbb',
              },
            ],
            expectedOutput: {
              type: FunctionReturnTypes.INT,
              value: 1,
            },
          },
          {
            inputArguments: [
              {
                type: FunctionReturnTypes.STRING,
                value: 'pwwkew',
              },
            ],
            expectedOutput: {
              type: FunctionReturnTypes.INT,
              value: 3,
            },
          },
        ],
>>>>>>> Add UnitTest model & test-data
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
      functionReturnType: FunctionReturnTypes.FLOAT,
      params: [
        { name: 'nums1', type: FunctionReturnTypes['INT[]'] },
        { name: 'nums2', type: FunctionReturnTypes['INT[]'] },
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
<<<<<<< HEAD
    unitTests: [
      {
        input: [
          {
            inputType: FunctionReturnTypes['INT[]'],
            inputValue: [1, 3],
          },
          {
            inputType: FunctionReturnTypes['INT[]'],
            inputValue: [2],
          },
        ],
        outputValue: 2.0,
      },
      {
        input: [
          {
            inputType: FunctionReturnTypes['INT[]'],
            inputValue: [1, 2],
          },
          {
            inputType: FunctionReturnTypes['INT[]'],
            inputValue: [3, 4],
          },
        ],
        outputValue: 2.5,
=======
    sampleTestCases: [
      {
        it: 'Example tests',
        assertions: [
          {
            inputArguments: [
              {
                type: FunctionReturnTypes['INT[]'],
                value: [1, 3],
              },
              {
                type: FunctionReturnTypes['INT[]'],
                value: [2],
              },
            ],
            expectedOutput: {
              type: FunctionReturnTypes.FLOAT,
              value: 2.0,
            },
          },
          {
            inputArguments: [
              {
                type: FunctionReturnTypes['INT[]'],
                value: [1, 2],
              },
              {
                type: FunctionReturnTypes['INT[]'],
                value: [3, 4],
              },
            ],
            expectedOutput: {
              type: FunctionReturnTypes.FLOAT,
              value: 2.5,
            },
          },
        ],
>>>>>>> Add UnitTest model & test-data
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
      functionReturnType: FunctionReturnTypes.STRING,
      params: [{ name: 's', type: FunctionReturnTypes.STRING }],
      appendedCode: Object.values(SupportedLanguages).reduce(
        (carry, lang) => ({ ...carry, [lang]: '' }),
        {},
      ),
      prependedCode: Object.values(SupportedLanguages).reduce(
        (carry, lang) => ({ ...carry, [lang]: '' }),
        {},
      ),
    },
<<<<<<< HEAD
    unitTests: [
      {
        input: [
          {
            inputType: FunctionReturnTypes.STRING,
            inputValue: 'man i need a taxi up to ubud',
          },
        ],
        outputValue: 'taxi',
      },
      {
        input: [
          {
            inputType: FunctionReturnTypes.STRING,
            inputValue: 'what time are we climbing up to the volcano',
          },
        ],
        outputValue: 'volcano',
      },
      {
        input: [
          {
            inputType: FunctionReturnTypes.STRING,
            inputValue: 'take me to semynak',
          },
        ],
        outputValue: 'semynak',
=======
    sampleTestCases: [
      {
        it: 'Example tests',
        assertions: [
          {
            inputArguments: [
              {
                type: FunctionReturnTypes.STRING,
                value: 'man i need a taxi up to ubud',
              },
            ],
            expectedOutput: {
              type: FunctionReturnTypes.STRING,
              value: 'taxi',
            },
          },
          {
            inputArguments: [
              {
                type: FunctionReturnTypes.STRING,
                value: 'what time are we climbing up to the volcano',
              },
            ],
            expectedOutput: {
              type: FunctionReturnTypes.STRING,
              value: 'volcano',
            },
          },
          {
            inputArguments: [
              {
                type: FunctionReturnTypes.STRING,
                value: 'take me to semynak',
              },
            ],
            expectedOutput: {
              type: FunctionReturnTypes.STRING,
              value: 'semynak',
            },
          },
        ],
>>>>>>> Add UnitTest model & test-data
      },
    ],
  },
};

const items: { [key: string]: Exercise } = Object.values(resources).reduce(
  (carry: object, resource: Exercise) => ({
    ...carry,
    [resource.id]: resource,
  }),
  {},
);

const add = (formValues: Omit<Exercise, 'id'>) => {
  const id = uuid();
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
