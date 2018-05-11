-- ---
-- Table 'comments'
-- 
-- ---

DROP TABLE IF EXISTS comments;
        
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  trip_id INTEGER NOT NULL,
  activity_id INTEGER NOT NULL,
  comments VARCHAR
);

-- ---
-- Table 'activities'
-- 
-- ---

DROP TABLE IF EXISTS activities;
        
CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  trip_id INTEGER NOT NULL,
  description VARCHAR,
  up_vote INTEGER DEFAULT 0,
  down_vote INTEGER DEFAULT 0,
  type VARCHAR,
  activity_level VARCHAR DEFAULT NULL,
  comment_id INTEGER,
  date_of_activity DATE,
  start_time TIME
);

-- ---
-- Table 'users_trips'
-- 
-- ---

DROP TABLE IF EXISTS users_trips;
        
CREATE TABLE users_trips (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  trip_id INTEGER NOT NULL,
  UNIQUE (user_id, trip_id)
);

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS users;
        
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  uid VARCHAR
);

-- Table 'trips'
-- 

DROP TABLE IF EXISTS trips;
        
CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  city VARCHAR NOT NULL,
  country VARCHAR NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  title VARCHAR NOT NULL,
  province VARCHAR,
  owner_id INTEGER NOT NULL
);

-- Table 'invitations'
-- 

DROP TABLE IF EXISTS invitations;


CREATE TABLE invitations (
 id SERIAL PRIMARY KEY,
 user_email VARCHAR NOT NULL,
 trip_id INTEGER NOT NULL,
 owner_id INTEGER NOT NULL,
 UNIQUE (user_email, trip_id, owner_id)
 );