-- Create Users Table
CREATE TABLE Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,  -- Username for registered users
  password VARCHAR(255) NOT NULL,         -- Hashed password for login
  email VARCHAR(255) NOT NULL UNIQUE,     -- Email for contact and login
  role ENUM('employee', 'recruiter') NOT NULL,  -- User role: employee or recruiter
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Companies Table
CREATE TABLE Companies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,           -- Name of the company (e.g., Sodexo)
  location VARCHAR(255) NOT NULL,       -- Location of the company
  industry VARCHAR(255),                -- Industry of the company (optional)
  contact_email VARCHAR(255) NOT NULL,  -- Contact email for the company
  userId INT,                           -- Foreign key to recruiter in Users table
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE SET NULL
);

-- Create JobOffers Table
CREATE TABLE JobOffers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,          -- Job title (e.g., Chef Gérant H/F)
  description TEXT NOT NULL,            -- Full job description
  salary DECIMAL(10, 2),                -- Salary (e.g., 2630 € / month)
  location VARCHAR(255) NOT NULL,       -- Job location (e.g., Nemours - 77)
  contract_type ENUM('CDI', 'CDD', 'Stage', 'Freelance') NOT NULL,  -- Contract type (e.g., CDI)
  remote BOOLEAN DEFAULT FALSE,         -- Is the job remote? (Télétavail)
  sector VARCHAR(255),                  -- Sector of activity
  education_level VARCHAR(255),         -- Education level required (e.g., BAC+2)
  companyId INT,                        -- Foreign key to Companies table
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date the job was posted
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (companyId) REFERENCES Companies(id) ON DELETE CASCADE
);

-- Create Applications Table
CREATE TABLE Applications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  applicant_name VARCHAR(255) NOT NULL,   -- Name of the applicant (non-registered users)
  email VARCHAR(255) NOT NULL,            -- Applicant's email
  phone VARCHAR(50),                      -- Applicant's phone (optional)
  message TEXT,                           -- Application message / cover letter
  jobOfferId INT,                         -- Foreign key to JobOffers table
  userId INT,                             -- Foreign key to Users table (NULL for non-registered users)
  seen BOOLEAN DEFAULT FALSE,             -- Has the recruiter seen the application?
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (jobOfferId) REFERENCES JobOffers(id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE SET NULL,
  UNIQUE (userId, jobOfferId)             -- Ensure users can't apply multiple times to the same job
);

-- Optional: Create SavedJobs Table for bookmarked jobs (for logged-in users)
CREATE TABLE SavedJobs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT,                             -- Foreign key to Users table
  jobOfferId INT,                         -- Foreign key to JobOffers table
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (jobOfferId) REFERENCES JobOffers(id) ON DELETE CASCADE,
  UNIQUE (userId, jobOfferId)             -- Ensure each job is saved only once per user
);

-- Optional: Create JobSearchFilters Table to store search filters for users
CREATE TABLE JobSearchFilters (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT,                             -- Foreign key to Users table (logged-in users)
  search_query VARCHAR(255),              -- Search query (e.g., keywords)
  location_filter VARCHAR(255),           -- Location filter (e.g., Rennes, Paris)
  contract_type_filter ENUM('CDI', 'CDD', 'Stage', 'Freelance'),  -- Contract type filter
  sector_filter VARCHAR(255),             -- Sector of activity filter
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Indexes for faster querying (optional but recommended)
CREATE INDEX idx_user_role ON Users(role);                      -- For filtering by user role (employee/recruiter)
CREATE INDEX idx_joboffer_location ON JobOffers(location);       -- For location filtering (search)
CREATE INDEX idx_application_seen ON Applications(seen);         -- For querying whether applications are seen or not
CREATE INDEX idx_joboffer_contract ON JobOffers(contract_type);  -- For filtering by contract type
CREATE INDEX idx_savedjobs ON SavedJobs(userId, jobOfferId);     -- For checking saved jobs
