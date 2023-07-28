INSERT INTO Cities (city_name) VALUES ('Istanbul'), ('Ankara'), ('Izmir');
INSERT INTO Bars (bar_name, city_id) VALUES ('Istanbul Barosu', 1), ('Istanbul Barosu 2', 1), ('Ankara Barosu 1', 2), ('Ankara Barosu 2', 2), ('Izmir Barosu 1', 3), ('Izmir Barosu 2', 3);
INSERT INTO Lawyers (email, password_hash, firstname, lastname, bar_id, lawyer_state, is_validated) VALUES ('alp.tuna.453@gmail.com','$2b$10$HeaHW/DpZkq3AThJeuUCmOLRizDXmN8SZ0hOy6Fdh1iPXcUXXTBV.', 'alp', 'tuna', 1, 'free', true);
INSERT INTO Lawyers (email, password_hash, firstname, lastname, bar_id, lawyer_state, is_validated) VALUES ('test1@gmail.com','$2b$10$HeaHW/DpZkq3AThJeuUCmOLRizDXmN8SZ0hOy6Fdh1iPXcUXXTBV.', 'test1', 'test1', 1, 'free', true);
INSERT INTO Lawyers (email, password_hash, firstname, lastname, bar_id, lawyer_state, is_validated) VALUES ('test2@gmail.com','$2b$10$HeaHW/DpZkq3AThJeuUCmOLRizDXmN8SZ0hOy6Fdh1iPXcUXXTBV.', 'test2', 'test2', 1, 'busy', true);

