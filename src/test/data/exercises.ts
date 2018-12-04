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
  D: 4,
};

const partialResources: {
  [key: string]: Omit<Exercise, 'title' | 'template' | 'sampleTestCases'>;
} = {};

Object.keys(ids).forEach((key) => {
  partialResources[key] = {
    difficulty: Difficulties.MEDIUM,
    description: { fr: faker.lorem.paragraph(), en: faker.lorem.paragraph() },
    id: ids[key],
    fixtures: {},
  };
});

const resources: { [key: string]: Exercise } = {
  A: {
    ...partialResources.A,
    title: {
      en: 'Longest Substring Without Repeating Characters',
      fr: 'Sous-chaîne la plus longue sans caractères répétés',
    },
    description: {
      fr:
        '<p>Given a string, find the length of the <b>longest substring</b> without repeating characters.</p><div><p><strong>Example 1:</strong></p><pre><strong>Input: </strong><span id="example-input-1-1">&quot;abcabcbb&quot;</span><br><strong>Output: </strong><span id="example-output-1">3<br><strong>Explanation:</strong></span> The answer is <code>&quot;abc&quot;</code>, with the length of 3.</pre><div><p><strong>Example 2:</strong></p><pre><strong>Input: </strong><span id="example-input-2-1">&quot;bbbbb&quot;</span><br><strong>Output: </strong><span id="example-output-2">1</span><span id="example-output-1"><br><strong>Explanation: </strong>T</span>he answer is <code>&quot;b&quot;</code>, with the length of 1.</pre><div><p><strong>Example 3:</strong></p><pre><strong>Input: </strong><span id="example-input-3-1">&quot;pwwkew&quot;</span><br><strong>Output: </strong><span id="example-output-3">3</span><span id="example-output-1"><br><strong>Explanation: </strong></span>The answer is <code>&quot;wke&quot;</code>, with the length of 3.<br>Note that the answer must be a <b>substring</b>, <code>&quot;pwke&quot;</code> is a <i>subsequence</i> and not a substring.</pre></div></div></div>',
    },
    template: {
      functionName: 'lengthOfLongestSubstring',
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
    description: {
      fr:
        '<p>There are two sorted arrays <b>nums1</b> and <b>nums2</b> of size m and n respectively.</p>' +
        '<p>Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).</p>' +
        '<p>You may assume <strong>nums1</strong> and <strong>nums2</strong>&nbsp;cannot be both empty.</p>' +
        '<p><b>Example 1:</b></p>' +
        '<pre>' +
        'nums1 = [1, 3]\n' +
        'nums2 = [2]\n' +
        'The median is 2.0\n' +
        '</pre>' +
        '<p><b>Example 2:</b></p>' +
        '<pre>' +
        'nums1 = [1, 2]\n' +
        'nums2 = [3, 4]\n' +
        'The median is (2 + 3)/2 = 2.5\n' +
        '</pre>',
    },
    template: {
      functionName: 'findMedianSortedArrays',
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
      functionName: 'highestScoringWord',
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
  D: {
    ...partialResources.D,
    title: {
      en: 'Fix string case',
      fr: 'Fixer le cas de la chaîne',
    },
    description: {
      fr:
        'Dans ce Kata, vous recevrez une chaîne qui peut avoir mélangé des lettres majuscules et minuscules et votre tâche consiste à convertir cette chaîne en minuscule uniquement ou en majuscule uniquement en fonction de:\n' +
        '\n' +
        '- faire le moins de changements possible.\n' +
        '- si la chaîne contient un nombre égal de lettres majuscules et minuscules, convertissez-la en minuscules.\n' +
        'Par exemple:\n' +
        '\n' +
        '> ```javascript\n' +
        'solve("coDe") = "code". Caractères minuscules > majuscules. Modifiez uniquement le "D" en minuscule.\n' +
        'solve("CODe") = "CODE". Caractères majuscules > minuscule. Ne changez que le "e" en majuscule.\n' +
        'solve("coDE") = "code". Majuscule == minuscule. Changer tout en minuscule.\n' +
        '```\n' +
        "Plus d'exemples dans des cas de test. Bonne chance!",
    },
    template: {
      functionName: 'fixStringCase',
      functionReturnType: SupportedType.STRING,
      params: [{ name: 'str', type: SupportedType.STRING }],
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
        it: 'BasicTests',
        assertions: [
          {
            inputArguments: [
              {
                type: SupportedType.STRING,
                value: 'code',
              },
            ],
            expectedOutput: {
              type: SupportedType.STRING,
              value: 'code',
            },
          },
          {
            inputArguments: [
              {
                type: SupportedType.STRING,
                value: 'CODe',
              },
            ],
            expectedOutput: {
              type: SupportedType.STRING,
              value: 'CODE',
            },
          },
          {
            inputArguments: [
              {
                type: SupportedType.STRING,
                value: 'COde',
              },
            ],
            expectedOutput: {
              type: SupportedType.STRING,
              value: 'code',
            },
          },
          {
            inputArguments: [
              {
                type: SupportedType.STRING,
                value: '',
              },
            ],
            expectedOutput: {
              type: SupportedType.STRING,
              value: '',
            },
          },
        ],
      },
    ],
  },
  E: {
    ...partialResources.D,
    title: {
      en: 'Two Sum',
      fr: 'Deux somme',
    },
    description: {
      fr:
        '<p>Given an array of integers, return <strong>indices</strong> of the two numbers such that they add up to a specific target.</p>\n' +
        '<p>You may assume that each input would have <strong><em>exactly</em></strong> one solution, and you may not use the <em>same</em> element twice.</p>\n' +
        '<p><strong>Example:</strong></p>\n' +
        '<pre>\n' +
        'Given nums = [2, 7, 11, 15], target = 9,\n' +
        'Because nums[<strong>0</strong>] + nums[<strong>1</strong>] = 2 + 7 = 9,\n' +
        'return [<strong>0</strong>, <strong>1</strong>].\n' +
        '</pre>\n' +
        '<p>&nbsp;</p>\n',
    },
    template: {
      functionName: 'twoSum',
      functionReturnType: SupportedType.STRING,
      params: [
        { name: 'nums', type: SupportedType.INTARRAY },
        { name: 'target', type: SupportedType.INT },
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
        it: 'BasicTests',
        assertions: [
          {
            inputArguments: [
              {
                type: SupportedType.INTARRAY,
                value: [2, 7, 11, 15],
              },
              {
                type: SupportedType.INT,
                value: 9,
              },
            ],
            expectedOutput: {
              type: SupportedType.INTARRAY,
              value: [0, 1],
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
