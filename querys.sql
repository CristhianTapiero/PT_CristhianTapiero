/* Primer query para saber cuantos cursos hay por modalidad*/
SELECT 
    c.name AS course,
    ins.name AS enrollment_status,
    COUNT(uc.userId) AS student_count
FROM Courses c
LEFT JOIN UsersCourse uc 
    ON c.id = uc.courseId
LEFT JOIN InscriptionStatus ins 
    ON uc.inscriptionStatusId = ins.id
GROUP BY 
    c.id, c.name, 
    ins.id, ins.name
ORDER BY 
    c.name, 
    student_count DESC;
/* Segundo query para saber cuantos la cantidad de estudiantes por estado de matricula*/
SELECT 
    m.name AS modality, 
    COUNT(c.id) AS course_count
FROM Modalities m
LEFT JOIN Courses c 
    ON m.id = c.modalityId
GROUP BY m.id, m.name
ORDER BY course_count DESC;

