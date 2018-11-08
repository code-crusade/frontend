import { Semesters } from 'src/config/enums';

export interface Group {
  readonly id: string;
  groupNumber: number;
  class: string;
  semster: Semesters;
  year: number;
  students: Student[];
}

export interface Student {
  firstName: string;
  lastName: string;
  accessCode: string;
  email: string;
}
