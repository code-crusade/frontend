import { Student } from './models';

/** Convert content from Excels to actual students */
export function convertToStudents(content: object[]): Student[] {
  const students: Student[] = [];
  content.forEach((row, i) => {
    if (i === 0) return; // Skip header
    students.push({
      firstName: row[0],
      lastName: row[1],
      accessCode: row[2],
      email: row[3],
    });
  });
  return students;
}
