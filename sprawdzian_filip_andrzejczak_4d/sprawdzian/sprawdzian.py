import datetime
import json
from typing import List, Dict, Any
from .models.Student import Student
from .models.Teacher import Teacher
from .models.Subject import Subject
from .models.Grades import Grades
from .year_grade import year_grade

__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Filip Andrzejczak 4D"

def load_teachers(file_path: str) -> List[Teacher]:
    teachers = []
    with open(file_path, 'r') as file:
        for line in file:
            parts = line.strip().split()
            if len(parts) >= 3:
                _id = int(parts[0])
                name = parts[1]
                surname = ' '.join(parts[2:])
                teachers.append(Teacher(_id, name, surname))
    return teachers

def load_subjects(file_path: str, teachers: List[Teacher]) -> List[Subject]:
    subjects = []
    teacher_dict = {t._id: t for t in teachers}
    with open(file_path, 'r') as file:
        for line in file:
            parts = line.strip().split()
            if len(parts) >= 3:
                _id = int(parts[0])
                name = ' '.join(parts[1:-1])
                teacher_id = int(parts[-1])
                if teacher_id in teacher_dict:
                    subjects.append(Subject(_id, name, teacher_dict[teacher_id]))
    return subjects

def load_students(file_path: str) -> List[Student]:
    students = []
    with open(file_path, 'r') as file:
        for line in file:
            parts = line.strip().split()
            if len(parts) >= 4:
                _id = int(parts[0])
                first_name = parts[1]
                last_name = ' '.join(parts[2:-1])
                birth_date = datetime.datetime.strptime(parts[-1], '%Y-%m-%d').date()
                students.append(Student(_id, first_name, last_name, birth_date))
    return students

def load_grades(file_path: str, students: List[Student], subjects: List[Subject]) -> List[Grades]:
    grades = []
    student_dict = {s._id: s for s in students}
    subject_dict = {s._id: s for s in subjects}
    
    with open(file_path, 'r') as file:
        for line in file:
            parts = line.strip().split()
            if len(parts) >= 3:
                student_id = int(parts[0])
                subject_id = int(parts[1])
                grades_str = parts[2].split(',')
                
                if student_id in student_dict and subject_id in subject_dict:
                    student = student_dict[student_id]
                    subject = subject_dict[subject_id]
                    grade_obj = Grades(student, subject)
                    
                    for grade in grades_str:
                        try:
                            grade_obj.add_grade(int(grade))
                        except ValueError:
                            continue
                    
                    grades.append(grade_obj)
    return grades

def generate_student_report(grades: List[Grades]) -> Dict[str, Any]:
    report = {}
    for grade in grades:
        student_key = str(grade.student)
        subject_name = grade.subject.name
        
        if student_key not in report:
            report[student_key] = {}
        
        report[student_key][subject_name] = {
            "Oceny": ", ".join(map(str, grade.get_grades())),
            "Średnia": round(grade.get_average(), 2),
            "Ocena roczna": year_grade(grade.get_average())
        }
    return report

def generate_subject_report(grades: List[Grades]) -> Dict[str, Any]:
    report = {}
    for grade in grades:
        subject_name = grade.subject.name
        
        if subject_name not in report:
            report[subject_name] = {
                "Nauczyciel": str(grade.subject.teacher),
                "Oceny": [],
                "Średnia": 0.0
            }
        
        report[subject_name]["Oceny"].extend(grade.get_grades())
    
    for subject in report:
        grades_list = report[subject]["Oceny"]
        if grades_list:
            report[subject]["Średnia"] = round(sum(grades_list) / len(grades_list), 2)
    
    return report

def main():

    teachers = load_teachers("teachers.txt")
    subjects = load_subjects("subjects.txt", teachers)
    students = load_students("students.txt")
    grades = load_grades("grades.txt", students, subjects)

    print("Oceny i średnie poszczególnych uczniów\n")
    student_report = generate_student_report(grades)
    
    for student, subjects in student_report.items():
        print(f"{student}:")
        for subject, data in subjects.items():
            print(f"{subject}:")
            print(f"Oceny: {data['Oceny']}")
            print(f"Średnia: {data['Średnia']}")
            print(f"Ocena końcowa: {data['Ocena roczna']}")
        print()

    with open("students.json", 'w') as f:
        json.dump(student_report, f, indent=4, ensure_ascii=False)

    print("=" * 50)
    print()

    subject_report = generate_subject_report(grades)
    
    for subject, data in subject_report.items():
        print(f"{subject}:")
        print(f"   Nauczyciel: {data['Nauczyciel']}")
        print(f"   Oceny: {', '.join(map(str, data['Oceny']))}")
        print(f"   Średnia: {data['Średnia']}")
        print()

    with open("subjects.json", 'w') as f:
        json.dump(subject_report, f, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    main()