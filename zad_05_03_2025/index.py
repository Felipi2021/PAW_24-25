class Student:
    def __init__(self, student_id: int, first_name: str, last_name: str, age: int):
        self.id = student_id
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.courses = []

class Course:
    def __init__(self, name: str):
        self.name = name

students = {}
with open('students.txt', 'r', encoding='utf-8') as file:
    for line in file:
        line = line.strip()
        if not line:
            continue
        parts = line.split(',')
        if len(parts) != 4:
            continue
        student_id = int(parts[0])
        students[student_id] = Student(
            student_id,
            parts[1].strip(),
            parts[2].strip(),
            int(parts[3].strip())
        )

with open('courses.txt', 'r', encoding='utf-8') as file:
    for line in file:
        line = line.strip()
        if not line:
            continue
        parts = line.split(',')
        if len(parts) < 2:
            continue
        student_id = int(parts[0])
        course_name = parts[1].strip()
        if student_id in students:
            students[student_id].courses.append(Course(course_name))

sorted_students = sorted(students.values(), key=lambda s: s.id)
for student in sorted_students:
    courses = ', '.join([course.name for course in student.courses])
    print(f"{student.first_name} {student.last_name} ({student.age} lat): {courses}")

for student in sorted_students:
    filename = f"{student.first_name.lower()}_{student.last_name.lower()}.txt"
    with open(filename, 'w', encoding='utf-8') as file:
        file.write("Kursy:\n")
        if student.courses:
            courses_list = [f"-  {course.name}" for course in student.courses]
            courses_str = ",\n".join(courses_list)
            file.write(courses_str)