# ai_moderator-x64

jwt auth done*
sign up - 
role - student or educator

enter basic details 

select role
role based auth
========================================
payload  to include user role 
educator  - create workspace, receive assigments, etc
student - do assignment etc

- endpoints access also considers role


db
--------
- roles - Student, Educator, Admin

 - role permission 
 Student[select workspace, access dashboard, viw]
 Educator[read, write,create,delete]
 Admin[read,write, delete, create]

 etc

models:
- user
- moderation
- assignment
- review
- workspace
- submission

workspace
=======================
workspace is represented by majors availlable - 3(Comp Science, Maths, Arts)
student joins workspace  according to major.
a student can be in several work spaces.

create workspace - name
add student to workspace - studentid
-------------------------------------
get workspace by id

param - userid
check if roles is student and add to space

assignment
================================
get workspace
create assignment
->  refactor assignment

submission
======================================
submit assignment
update submission
grade submission - eduactor
