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
