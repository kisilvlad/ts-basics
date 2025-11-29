# TypeScript Basics Project

Цей репозиторій демонструє базове налаштування проєкту на TypeScript.

Приклад запуску

```bash
Error registering for course: Студент вже зареєстрований на цей курс
Error registering for course: Студент (Марія Сидоренко) з факультету (Computer_Science) не може записатися на курс іншого факультету (Economics)
Студенти комп. факультету: [
  {
    id: 1,
    fullName: 'Іван Петренко',
    faculty: 'Computer_Science',
    year: 1,
    status: 'Active',
    enrollmentDate: 2025-11-29T20:03:27.718Z,
    groupNumber: 'CS-01'
  },
  {
    id: 2,
    fullName: 'Марія Сидоренко',
    faculty: 'Computer_Science',
    year: 1,
    status: 'Active',
    enrollmentDate: 2025-11-29T20:03:27.718Z,
    groupNumber: 'CS-01'
  }
]
Оцінки Івана: [
  {
    studentId: 1,
    courseId: 1,
    date: 2025-11-29T20:03:27.725Z,
    semester: 'First',
    grade: 5
  },
  {
    studentId: 1,
    courseId: 3,
    date: 2025-11-29T20:03:27.725Z,
    semester: 'Second',
    grade: 5
  }
]
Середній бал Івана: 5
Відмінники комп. факультету: [
  {
    id: 1,
    fullName: 'Іван Петренко',
    faculty: 'Computer_Science',
    year: 1,
    status: 'Active',
    enrollmentDate: 2025-11-29T20:03:27.718Z,
    groupNumber: 'CS-01'
  }
]
Доступні курси комп. факультету 1 семестр: [
  {
    id: 1,
    name: 'Алгоритми',
    type: 'Mandatory',
    credits: 5,
    semester: 'First',
    faculty: 'Computer_Science',
    maxStudents: 3
  }
]
```
