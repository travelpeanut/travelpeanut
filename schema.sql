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
  comments VARCHAR(255)
);

-- ---
-- Table 'activities'
-- 
-- ---

DROP TABLE IF EXISTS activities;
        
CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  trip_id INTEGER NOT NULL,
  description VARCHAR(255),
  up_vote INTEGER DEFAULT 0,
  down_vote INTEGER DEFAULT 0,
  type VARCHAR(255),
  activity_level VARCHAR(255) DEFAULT NULL,
  comment_id INTEGER,
  start_date DATE,
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
  trip_id INTEGER NOT NULL
);

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS users;
        
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

-- Table 'trips'
-- 

DROP TABLE IF EXISTS trips;
        
CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  city VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  title VARCHAR(255) NOT NULL,
  province VARCHAR(255),
  owner_id INTEGER NOT NULL
);

-- Table 'chats'
-- 

DROP TABLE IF EXISTS chats;
        
CREATE TABLE chats (
  id SERIAL PRIMARY KEY,
  date_time TIMESTAMP NOT NULL,
  user_id INTEGER NOT NULL,
  message VARCHAR(255) NOT NULL,
  trip_id INTEGER NOT NULL
);