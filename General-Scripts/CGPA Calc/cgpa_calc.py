import json
import numpy as np
from utils import * 

'''
{
    'course_code' : str,
    'course_name' : str,
    'credits'     : int,
    'grade'       : str
}
'''

def validate_grade (course : dict) -> str :
    grade = input(f"Enter Grade for {course['course_code']}— {course['course_name']}: ").upper()
    # grade = "B+"
    return grade if grade in GRADEPOINTS else validate_grade(course)

with open('./grades.json', 'r') as f_obj :
    data = json.load(f_obj)

total_credits = 0
grade_points = 0


for semester in data :

    # if semester != "semester-2" : continue

    sem_credits = 0
    sem_gpoints = 0
    for course in data[semester] :
        course_credit = course["credits"]
        course_grade_point = GRADEPOINTS[course["grade"]] if course["grade"] != "" else GRADEPOINTS[validate_grade(course)]
        # course_grade_point = GRADEPOINTS[validate_grade(course)]

        sem_credits += course_credit
        sem_gpoints += course_grade_point * course_credit

    print(f"SGPA for {semester}: {sem_gpoints / sem_credits}")

    total_credits += sem_credits
    grade_points += sem_gpoints
    print(sem_credits, sem_gpoints)

print(f"Expected CGPA: {grade_points / total_credits}")