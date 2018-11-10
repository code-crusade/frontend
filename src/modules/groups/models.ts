import { Semesters } from 'src/config/enums';
import { Student } from '../students/models';

export interface Group {
  readonly id: string;
  groupNumber: number;
  class: string;
  semester: Semesters;
  year: number;
  students: Student[];
  archived: boolean;
}
