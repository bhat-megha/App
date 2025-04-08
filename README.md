STEP 1: Clone the repository
1.	git clone https://github.com/bhat-megha/App.git
2.	cd form-submission-app

STEP 2: Start the Backend
1.	cd backend
2.	npm install
3.	node index.js
Backend will run at: http://localhost:4000
<img width="427" alt="image" src="https://github.com/user-attachments/assets/6819d54a-ec7d-4207-99c4-083672246710" />

 
STEP 3. Start the Frontend
1.	cd frontend
2.	npm install
3.	npm start
Frontend will run at: http://localhost:3000

 

STEP 4: Testing the App
1.	Open http://localhost:3000
2.	Fill in the form with date, amount, description, and upload a file (pdf only).
3.	Submit and see the console or network tab for confirmation.
4.	Data will be saved in the SQLite database (backend/database.db).
•	sqlite3 database.db
•	SELECT * FROM receipts;
•	.quit

