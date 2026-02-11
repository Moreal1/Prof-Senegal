-- SQL commands to create initial data for the application

-- Insert sample users
INSERT INTO users (email, password, role) VALUES
('prof1@example.com', 'hashed_password1', 'Professeur'),
('prof2@example.com', 'hashed_password2', 'Professeur');

-- Insert sample schools
INSERT INTO schools (name, type) VALUES
('Lycée Blaise Diagne', 'Public'),
('Complexe scolaire X', 'Privé');

-- Insert sample classes
INSERT INTO classes (name, school_id) VALUES
('Terminale S1', 1),
('Seconde L', 1),
('Terminale S2', 2),
('Première S', 2);

-- Insert sample schedules
INSERT INTO schedules (day, start_time, end_time, class_id, subject, school_id) VALUES
('Monday', '08:00:00', '09:30:00', 1, 'Math', 1),
('Monday', '10:00:00', '11:30:00', 2, 'PC', 1),
('Tuesday', '08:00:00', '09:30:00', 3, 'SVT', 2),
('Wednesday', '10:00:00', '11:30:00', 4, 'Math', 2);

-- Insert sample assignments
INSERT INTO assignments (title, description, due_date, class_id, subject, type) VALUES
('Devoir maison 1', 'Mathématiques - Problèmes', '2023-10-15', 1, 'Math', 'Maison'),
('Devoir en classe 1', 'Physique - Examen', '2023-10-20', 2, 'PC', 'Classe');

-- Insert sample documents
INSERT INTO documents (title, type, class_id, school_id) VALUES
('Cours de Math - Terminale S', 'PDF', 1, 1),
('Exercices de Physique', 'PDF', 2, 1),
('Sujets d’examen - Terminale S', 'PDF', 3, 2);