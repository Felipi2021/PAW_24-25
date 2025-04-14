
__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Filip Andrzejczak 4D"

from typing import List
from .Student import Student
from .Subject import Subject

class Grades:
    def __init__(self, student: Student, subject: Subject) -> None:
        self.grades: List[int] = []
        self.student = student
        self.subject = subject

    def add_grade(self, grade: int) -> None:
        if grade < 1 or grade > 6:
            raise ValueError("Grade must be between 1 and 6.")
        self.grades.append(grade)

    def get_grades(self) -> List[int]:
        return self.grades

    def get_average(self) -> float:
        if not self.grades:
            return 0.0
        return round(sum(self.grades) / len(self.grades), 2)