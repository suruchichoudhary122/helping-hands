-- db/seeds.sql

-- Insert sample services
INSERT INTO services (name, description, category) VALUES
('Grocery Shopping', 'Assistance with grocery shopping and delivery', 'Daily Living'),
('Transportation', 'Rides to appointments or errands', 'Transportation'),
('Meal Preparation', 'Help preparing nutritious meals', 'Food'),
('Medication Reminder', 'Gentle reminders to take medications', 'Health'),
('Light Housekeeping', 'Help with light cleaning tasks', 'Home Care'),
('Companionship', 'Friendly visits and conversation', 'Social'),
('Technology Help', 'Assistance with computers, phones, or other devices', 'Technology'),
('Yard Work', 'Basic outdoor maintenance and gardening', 'Home Care');

-- Insert sample admin user (password: admin123)
INSERT INTO users (first_name, last_name, email, password_hash, phone, user_type) VALUES
('Admin', 'User', 'admin@helpinghands.com', '$2b$10$rPQtxMI.QSrVQw4nXm5CyeDXy5r3tq5bcAYGZpyKkKzxYzUdnA2eK', '555-123-4567', 'admin');

-- Insert sample volunteer users (password: password123)
INSERT INTO users (first_name, last_name, email, password_hash, phone, address, user_type, bio, skills, availability) VALUES
('John', 'Doe', 'john@example.com', '$2b$10$VFDUoELqPbfxHvRwI0HrZ.qeGGNFkXKCGO5PK1SUpPwvfNUxFgXXq', '555-111-2222', '123 Main St, Anytown, ST 12345', 'volunteer', 'I love helping seniors in my community!', ARRAY['driving', 'cooking', 'technology'], '{"monday": ["morning", "afternoon"], "wednesday": ["afternoon"], "friday": ["morning"]}'),
('Jane', 'Smith', 'jane@example.com', '$2b$10$VFDUoELqPbfxHvRwI0HrZ.qeGGNFkXKCGO5PK1SUpPwvfNUxFgXXq', '555-333-4444', '456 Oak Ave, Othertown, ST 67890', 'volunteer', 'Retired nurse eager to continue caring for others', ARRAY['healthcare', 'driving', 'companionship'], '{"tuesday": ["morning", "afternoon"], "thursday": ["afternoon"], "saturday": ["morning", "afternoon"]}');

-- Insert sample senior users (password: password123)
INSERT INTO users (first_name, last_name, email, password_hash, phone, address, user_type) VALUES
('Robert', 'Johnson', 'robert@example.com', '$2b$10$VFDUoELqPbfxHvRwI0HrZ.qeGGNFkXKCGO5PK1SUpPwvfNUxFgXXq', '555-555-6666', '789 Pine St, Sometown, ST 13579', 'senior'),
('Mary', 'Williams', 'mary@example.com', '$2b$10$VFDUoELqPbfxHvRwI0HrZ.qeGGNFkXKCGO5PK1SUpPwvfNUxFgXXq', '555-777-8888', '321 Elm St, Anycity, ST 24680', 'senior');

-- Insert sample service requests
INSERT INTO service_requests (senior_id, service_id, status, description, datetime, location, special_requirements) VALUES
(3, 1, 'open', 'Need help buying groceries for the week', '2025-05-25 10:00:00', '789 Pine St, Sometown, ST 13579', 'I have some dietary restrictions - no dairy'),
(4, 3, 'assigned', 'Would like help preparing meals for the week', '2025-05-23 14:00:00', '321 Elm St, Anycity, ST 24680', 'Kitchen has all necessary equipment'),
(3, 6, 'completed', 'Looking for someone to chat with for an hour or two', '2025-05-15 13:00:00', '789 Pine St, Sometown, ST 13579', 'I enjoy talking about gardening and history');

-- Assign volunteer to second request
UPDATE service_requests SET volunteer_id = 1 WHERE id = 2;
UPDATE service_requests SET volunteer_id = 2, status = 'completed' WHERE id = 3;

-- Add sample messages
INSERT INTO messages (sender_id, recipient_id, request_id, content, is_read) VALUES
(3, 1, 2, 'Looking forward to your help with meal prep!', false),
(1, 3, 2, 'I'll be there on time. Any food preferences I should know about?', true),
(4, 2, 3, 'Thank you for the lovely conversation yesterday.', true),
(2, 4, 3, 'It was my pleasure! I enjoyed hearing about your garden.', true);

-- Add sample reviews
INSERT INTO reviews (request_id, reviewer_id, reviewee_id, rating, comment) VALUES
(3, 4, 2, 5, 'Jane was wonderful company. Very kind and attentive.'),
(3, 2, 4, 5, 'Mary is a delightful person with fascinating stories.');