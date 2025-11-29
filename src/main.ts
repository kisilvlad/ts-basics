enum StudentStatus {
  Active = "Active",
  Academic_Leave = "Academic_Leave",
  Graduated = "Graduated",
  Expelled = "Expelled",
}

enum CourseType {
  Mandatory = "Mandatory",
  Optional = "Optional",
  Special = "Special",
}

enum Semester {
  First = "First",
  Second = "Second",
}

enum GradeValue {
  Excellent = 5,
  Good = 4,
  Satisfactory = 3,
  Unsatisfactory = 2,
}

enum Faculty {
  Computer_Science = "Computer_Science",
  Economics = "Economics",
  Law = "Law",
  Engineering = "Engineering",
}

interface Student {
  id: number;
  fullName: string;
  faculty: Faculty;
  year: number;
  status: StudentStatus;
  enrollmentDate: Date;
  groupNumber: string;
}

interface Course {
  id: number;
  name: string;
  type: CourseType;
  credits: number;
  semester: Semester;
  faculty: Faculty;
  maxStudents: number;
}

interface Grade {
  studentId: number;
  courseId: number;
  grade?: GradeValue;
  date: Date;
  semester: Semester;
}

class UniversityManagementSystem {
  private students: Student[] = [];
  private courses: Course[] = [];
  private grades: Grade[] = [];

  enrollStudent(student: Omit<Student, "id">): Student {
    const newStudent: Student = {
      id: this.students.length + 1,
      ...student,
    };
    this.students.push(newStudent);
    return newStudent;
  }

  addCourse(course: Omit<Course, "id">): Course {
    const exists = this.courses.some(
      (c) =>
        c.name === course.name &&
        c.faculty === course.faculty &&
        c.semester === course.semester
    );
    if (exists)
      throw new Error(
        "Курс з таким ім'ям вже існує на цьому факультеті і семестрі"
      );

    const newCourse: Course = {
      id: this.courses.length + 1,
      ...course,
    };
    this.courses.push(newCourse);
    return newCourse;
  }

  registerForCourse(studentId: number, courseId: number): void {
    const student = this.students.find((s) => s.id === studentId);
    const course = this.courses.find((c) => c.id === courseId);

    if (!student) throw new Error("Студент не знайдений");
    if (!course) throw new Error("Курс не знайдений");
    if (student.faculty !== course.faculty)
      throw new Error(
        `Студент (${student.fullName}) з факультету (${student.faculty}) не може записатися на курс іншого факультету (${course.faculty})`
      );

    const enrolledCount = this.grades.filter(
      (g) => g.courseId === courseId
    ).length;
    if (enrolledCount >= course.maxStudents)
      throw new Error("Курс вже заповнений");

    const alreadyRegistered = this.grades.some(
      (g) => g.studentId === studentId && g.courseId === courseId
    );
    if (alreadyRegistered)
      throw new Error("Студент вже зареєстрований на цей курс");

    this.grades.push({
      studentId,
      courseId,
      date: new Date(),
      semester: course.semester,
    });
  }

  setGrade(studentId: number, courseId: number, grade: GradeValue): void {
    const record = this.grades.find(
      (g) => g.studentId === studentId && g.courseId === courseId
    );
    if (!record) throw new Error("Студент не зареєстрований на курс");
    if (record.grade !== undefined) throw new Error("Оцінка вже виставлена");

    record.grade = grade;
    record.date = new Date();
  }

  updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
    const student = this.students.find((s) => s.id === studentId);
    if (!student) throw new Error("Студент не знайдений");
    if (student.status === StudentStatus.Expelled)
      throw new Error("Неможливо змінити статус відрахованому студенту");

    student.status = newStatus;
  }

  getStudentsByFaculty(faculty: Faculty): Student[] {
    return this.students.filter((s) => s.faculty === faculty);
  }

  getStudentGrades(studentId: number): Grade[] {
    return this.grades.filter(
      (g) => g.studentId === studentId && g.grade !== undefined
    );
  }

  getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
    return this.courses.filter(
      (c) => c.faculty === faculty && c.semester === semester
    );
  }

  calculateAverageGrade(studentId: number): number {
    const studentGrades = this.getStudentGrades(studentId);
    if (studentGrades.length === 0) return 0;

    const sum = studentGrades.reduce((acc, g) => acc + (g.grade ?? 0), 0);
    return parseFloat((sum / studentGrades.length).toFixed(2));
  }

  getExcellentStudents(faculty: Faculty): Student[] {
    return this.students.filter((student) => {
      if (student.faculty !== faculty) return false;

      const grades = this.getStudentGrades(student.id);
      return (
        grades.length > 0 &&
        grades.every((g) => g.grade === GradeValue.Excellent)
      );
    });
  }
}

// --- Демонстрація ---
function demo(): void {
  const system = new UniversityManagementSystem();

  // Курси
  const course1 = system.addCourse({
    name: "Алгоритми",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 3,
  });
  const course2 = system.addCourse({
    name: "Економіка",
    type: CourseType.Optional,
    credits: 4,
    semester: Semester.First,
    faculty: Faculty.Economics,
    maxStudents: 5,
  });
  const course3 = system.addCourse({
    name: "Бази даних",
    type: CourseType.Special,
    credits: 3,
    semester: Semester.Second,
    faculty: Faculty.Computer_Science,
    maxStudents: 2,
  });

  // Студенти
  const st1 = system.enrollStudent({
    fullName: "Іван Петренко",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "CS-01",
  });
  const st2 = system.enrollStudent({
    fullName: "Марія Сидоренко",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "CS-01",
  });
  const st3 = system.enrollStudent({
    fullName: "Олексій Коваленко",
    faculty: Faculty.Economics,
    year: 2,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "EC-02",
  });

  // Реєстрація на курси
  try {
    system.registerForCourse(st1.id, course1.id);
  } catch (error) {
    console.error(
      "Error registering for course:",
      error instanceof Error ? error.message : error
    );
  }
  try {
    system.registerForCourse(st1.id, course3.id);
  } catch (error) {
    console.error(
      "Error registering for course:",
      error instanceof Error ? error.message : error
    );
  }
  try {
    system.registerForCourse(st2.id, course1.id);
  } catch (error) {
    console.error(
      "Error registering for course:",
      error instanceof Error ? error.message : error
    );
  }
  try {
    system.registerForCourse(st2.id, course2.id);
  } catch (error) {
    console.error(
      "Error registering for course:",
      error instanceof Error ? error.message : error
    );
  }

  // Встановлення оцінок
  system.setGrade(st1.id, course1.id, GradeValue.Excellent);
  system.setGrade(st1.id, course3.id, GradeValue.Excellent);
  system.setGrade(st2.id, course1.id, GradeValue.Good);

  // Перевірка
  console.log(
    "Студенти комп. факультету:",
    system.getStudentsByFaculty(Faculty.Computer_Science)
  );
  console.log("Оцінки Івана:", system.getStudentGrades(st1.id));
  console.log("Середній бал Івана:", system.calculateAverageGrade(st1.id));
  console.log(
    "Відмінники комп. факультету:",
    system.getExcellentStudents(Faculty.Computer_Science)
  );
  console.log(
    "Доступні курси комп. факультету 1 семестр:",
    system.getAvailableCourses(Faculty.Computer_Science, Semester.First)
  );
}

demo();
