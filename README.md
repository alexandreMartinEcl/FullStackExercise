# FullStackExercise for AP-HP

Developed by Alexandre Martin.

## How to launch

Clone the repository 
`git clone https://github.com/alexandreMartinEcl/FullStackExercise.git`

### Backend side

Start by creating your virtual environment. Then activate it and install the requirements.txt. Finally, start the server.

    virtualenv venv -p python3.6
    source venv/bin/activate
    cd TrafficDisplayer
    pip install -r requirements.txt
    python manage.py runserver


### Frontend side

Go to `traffic-frontend`folder and run npm install then npm run start
Create your `env` file defining the backend url (by checking the response from `python manage.py runserver` launched previously)
Copy/pasting and renaming `env.example` should be enough.
Before running the app, check that the BACKEND_BASE_URL in .env file is correct 

    cd traffic-frontend
    npm install
    npm run start

## What could have been added with more time

- Datatable rendering is not efficient, using `react-virtualized` to display only a part of the lines would be better
- Implementing a docker doing all the launch process, including `npm run build` and having the backend returning the static version of the frontend side would be more handy
- Testing side in React and Django have not been studied and implemented
- Some code should be more documented
