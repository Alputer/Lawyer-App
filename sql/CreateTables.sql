CREATE TABLE IF NOT EXISTS Cities (
	city_id SERIAL,
	city_name VARCHAR(255) NOT NULL,
	PRIMARY KEY (city_id)
);

CREATE TABLE IF NOT EXISTS Bars (
 	bar_id SERIAL,
 	bar_name VARCHAR(255) NOT NULL,
 	city_id INTEGER,
 	PRIMARY KEY (bar_id),
 	FOREIGN KEY (city_id) REFERENCES Cities (city_id)
	ON DELETE SET NULL 
	ON UPDATE CASCADE
	
);

CREATE TABLE IF NOT EXISTS Lawyers (
 	email VARCHAR(255),
	password_hash VARCHAR(255) NOT NULL,
 	firstname VARCHAR(255) NOT NULL,
 	lastname VARCHAR(255) NOT NULL,
	bar_id INTEGER,
	lawyer_state LAWYER_STATE NOT NULL DEFAULT 'free',
	average_rating REAL,
	is_validated BOOLEAN NOT NULL DEFAULT false,
	verification_code VARCHAR(255),
	reset_token VARCHAR(255),
	last_location INTEGER,
	PRIMARY KEY (email),
	FOREIGN KEY (last_location) REFERENCES Cities (city_id)
	ON DELETE SET NULL 
	ON UPDATE CASCADE,
	FOREIGN KEY (bar_id) REFERENCES Bars (bar_id)
	ON DELETE SET NULL 
	ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS LawyerProfiles (
	email VARCHAR(255),
 	age INTEGER,
 	phone_number VARCHAR(255),
 	linkedin_url VARCHAR(255),
 	PRIMARY KEY (email),
	FOREIGN KEY (email) REFERENCES Lawyers (email)
	ON DELETE CASCADE 
	ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Rates (
	rater_email VARCHAR(255),
	rated_email VARCHAR(255),
	rating INTEGER NOT NULL,
	PRIMARY KEY (rater_email, rated_email),
	FOREIGN KEY (rater_email) REFERENCES Lawyers(email)
	ON DELETE SET NULL 
	ON UPDATE CASCADE,
	FOREIGN KEY (rated_email) REFERENCES Lawyers(email)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Jobs (
 	job_id VARCHAR(255),
	executor VARCHAR(255),
	requester VARCHAR(255) NOT NULL,
	job_description VARCHAR(2048) NOT NULL,
	job_status JOB_STATE NOT NULL DEFAULT 'not_started', 
 	create_date DATE NOT NULL,
	start_date DATE,
 	due_date DATE,
	finish_date DATE,
	PRIMARY KEY (job_id),
	FOREIGN KEY (executor) REFERENCES Lawyers(email)
 	ON DELETE SET NULL 
	ON UPDATE CASCADE,
	FOREIGN KEY (requester) REFERENCES Lawyers(email)
	ON DELETE CASCADE 
	ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Offers (
 	offer_id VARCHAR(255),
	job_id VARCHAR(255) NOT NULL,
	requester VARCHAR(255) NOT NULL,
	receiver VARCHAR(255) NOT NULL,
	offer_status OFFER_STATE NOT NULL DEFAULT 'pending',
 	offer_date DATE NOT NULL,
	response_date DATE,
 	dismiss_date DATE,
	PRIMARY KEY (offer_id),
	FOREIGN KEY (job_id) REFERENCES Jobs(job_id)
	ON DELETE CASCADE 
	ON UPDATE CASCADE,
	FOREIGN KEY (receiver) REFERENCES Lawyers(email)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	FOREIGN KEY (requester) REFERENCES Lawyers(email)
	ON DELETE CASCADE 
	ON UPDATE CASCADE
);
