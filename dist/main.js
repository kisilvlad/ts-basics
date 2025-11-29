"use strict";
// ----- Дані -----
const professors = [];
const classrooms = [];
const courses = [];
const schedule = [];
// ----- Додавання професора -----
function addProfessor(professor) {
    professors.push(professor);
}
// ----- Валідація уроку -----
function validateLesson(lesson, ignoreLessonId) {
    const key = `${lesson.dayOfWeek}-${lesson.timeSlot}`;
    for (const l of schedule) {
        if (ignoreLessonId && l.id === ignoreLessonId)
            continue;
        if (l.dayOfWeek === lesson.dayOfWeek && l.timeSlot === lesson.timeSlot) {
            if (l.professorId === lesson.professorId)
                return { type: "ProfessorConflict", lessonDetails: l };
            if (l.classroomNumber === lesson.classroomNumber)
                return { type: "ClassroomConflict", lessonDetails: l };
        }
    }
    return null;
}
// ----- Додавання уроку -----
function addLesson(lesson) {
    if (validateLesson(lesson))
        return false;
    schedule.push(lesson);
    return true;
}
// ----- Пошук вільних аудиторій -----
function findAvailableClassrooms(timeSlot, dayOfWeek) {
    const occupied = new Set(schedule
        .filter((l) => l.dayOfWeek === dayOfWeek && l.timeSlot === timeSlot)
        .map((l) => l.classroomNumber));
    return classrooms.filter((c) => !occupied.has(c.number)).map((c) => c.number);
}
// ----- Розклад професора (сортування за днем і часом) -----
function getProfessorSchedule(professorId) {
    return schedule
        .filter((l) => l.professorId === professorId)
        .sort((a, b) => {
        const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        return dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek);
    });
}
// ----- Використання аудиторії -----
function getClassroomUtilization(classroomNumber) {
    const usedSlots = new Set(schedule
        .filter((l) => l.classroomNumber === classroomNumber)
        .map((l) => `${l.dayOfWeek}-${l.timeSlot}`)).size;
    const totalSlots = 5 * 5; // 5 днів × 5 слотів
    return (usedSlots / totalSlots) * 100;
}
// ----- Найпопулярніший тип занять -----
function getMostPopularCourseType() {
    const count = schedule.reduce((acc, l) => {
        const course = courses.find((c) => c.id === l.courseId);
        if (course)
            acc[course.type]++;
        return acc;
    }, { Lecture: 0, Seminar: 0, Lab: 0, Practice: 0 });
    return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
}
// ----- Перевід аудиторії -----
function reassignClassroom(lessonId, newClassroomNumber) {
    const lesson = schedule.find((l) => l.id === lessonId);
    if (!lesson)
        return false;
    // Перевірка, що така аудиторія існує
    const classroomExists = classrooms.some((c) => c.number === newClassroomNumber);
    if (!classroomExists) {
        console.log(`(Error) Classroom ${newClassroomNumber} does not exist`);
        return false;
    }
    const newLesson = { ...lesson, classroomNumber: newClassroomNumber };
    const conflict = validateLesson(newLesson, lessonId); // ігноруємо тільки сам урок
    if (conflict) {
        console.log(`(Error) Cannot reassign: ${conflict.type} with lesson ID ${conflict.lessonDetails.id}`);
        return false;
    }
    lesson.classroomNumber = newClassroomNumber;
    console.log(`(DONE) Reassigned lesson ${lessonId} to classroom ${newClassroomNumber}`);
    return true;
}
// ----- Скасування уроку -----
function cancelLesson(lessonId) {
    const index = schedule.findIndex((l) => l.id === lessonId);
    if (index !== -1)
        schedule.splice(index, 1);
}
// ----- Тести -----
function test() {
    addProfessor({ id: 1, name: "Dr. Johnson", department: "Physics" });
    addProfessor({ id: 2, name: "Prof. Lee", department: "Chemistry" });
    addProfessor({ id: 3, name: "Dr. Miller", department: "Mathematics" });
    classrooms.push({ number: "A101", capacity: 40, hasProjector: true });
    classrooms.push({ number: "B201", capacity: 35, hasProjector: true });
    classrooms.push({ number: "C301", capacity: 25, hasProjector: false });
    classrooms.push({ number: "D401", capacity: 50, hasProjector: true });
    courses.push({ id: 1, name: "Physics 101", type: "Lecture" });
    courses.push({ id: 2, name: "Physics Lab", type: "Lab" });
    courses.push({ id: 3, name: "Chemistry Seminar", type: "Seminar" });
    courses.push({ id: 4, name: "Math Practice", type: "Practice" });
    const lessons = [
        {
            id: 1,
            courseId: 1,
            professorId: 1,
            classroomNumber: "A101",
            dayOfWeek: "Monday",
            timeSlot: "8:30-10:00",
        },
        {
            id: 2,
            courseId: 2,
            professorId: 1,
            classroomNumber: "B201",
            dayOfWeek: "Monday",
            timeSlot: "10:15-11:45",
        },
        {
            id: 3,
            courseId: 3,
            professorId: 2,
            classroomNumber: "C301",
            dayOfWeek: "Monday",
            timeSlot: "8:30-10:00",
        },
        {
            id: 4,
            courseId: 4,
            professorId: 3,
            classroomNumber: "D401",
            dayOfWeek: "Tuesday",
            timeSlot: "12:15-13:45",
        },
        {
            id: 5,
            courseId: 1,
            professorId: 1,
            classroomNumber: "A101",
            dayOfWeek: "Tuesday",
            timeSlot: "14:00-15:30",
        },
        {
            id: 6,
            courseId: 3,
            professorId: 2,
            classroomNumber: "C301",
            dayOfWeek: "Wednesday",
            timeSlot: "15:45-17:15",
        },
    ];
    lessons.forEach((l) => addLesson(l));
    console.log("Available classrooms Monday 8:30-10:00:", findAvailableClassrooms("8:30-10:00", "Monday"));
    console.log("Professor 1 schedule:", getProfessorSchedule(1));
    console.log("Classroom A101 utilization:", getClassroomUtilization("A101").toFixed(2) + "%");
    console.log("Most popular course type:", getMostPopularCourseType());
    console.log("Reassign lesson 1 to B201:", reassignClassroom(1, "B201"));
    console.log("Reassign lesson 1 to D401:", reassignClassroom(1, "D401"));
    console.log("Reassign lesson 1 to B101:", reassignClassroom(1, "B101"));
    console.log("Reassign lesson 1 to С301:", reassignClassroom(1, "C301"));
    cancelLesson(1);
    console.log("Professor 1 schedule after cancel:", getProfessorSchedule(1));
}
test();
// -----  вивід -----
// node main.js
// Available classrooms Monday 8:30-10:00: [ 'B201', 'D401' ]
// Professor 1 schedule: [
//   {
//     id: 1,
//     courseId: 1,
//     professorId: 1,
//     classroomNumber: 'A101',
//     dayOfWeek: 'Monday',
//     timeSlot: '8:30-10:00'
//   },
//   {
//     id: 2,
//     courseId: 2,
//     professorId: 1,
//     classroomNumber: 'B201',
//     dayOfWeek: 'Monday',
//     timeSlot: '10:15-11:45'
//   },
//   {
//     id: 5,
//     courseId: 1,
//     professorId: 1,
//     classroomNumber: 'A101',
//     dayOfWeek: 'Tuesday',
//     timeSlot: '14:00-15:30'
//   }
// ]
// Classroom A101 utilization: 8.00%
// Most popular course type: Lecture
// (DONE) Reassigned lesson 1 to classroom B201
// Reassign lesson 1 to B201: true
// (DONE) Reassigned lesson 1 to classroom D401
// Reassign lesson 1 to D401: true
// (Error) Classroom B101 does not exist
// Reassign lesson 1 to B101: false
// (Error) Cannot reassign: ClassroomConflict with lesson ID 3
// Reassign lesson 1 to С301: false
// Professor 1 schedule after cancel: [
//   {
//     id: 2,
//     courseId: 2,
//     professorId: 1,
//     classroomNumber: 'B201',
//     dayOfWeek: 'Monday',
//     timeSlot: '10:15-11:45'
//   },
//   {
//     id: 5,
//     courseId: 1,
//     professorId: 1,
//     classroomNumber: 'A101',
//     dayOfWeek: 'Tuesday',
//     timeSlot: '14:00-15:30'
//   }
// ]
