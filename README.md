# guruji_nodeApp

This is node todo app with jwt authentication.

#setUp project on locals
   1. pass command **npm install**
   2. pass command **node index.js**
   3. or **npm run dev**
   4. setUp your own database URL
# APIs Paths
   1. for user sign-up
     a. http://localhost:8000/user/create [for register user]---POST Request
     ![Screenshot 2023-06-03 204210](https://github.com/vaidyahimanshu502/guruji_nodeApp/assets/76218691/84b36ab9-702c-489c-aa1f-7577312411e0)
     b. http://localhost:8000/user/sign-in [for log in user with jwt authentication]---POST Request
     ![Screenshot 2023-06-03 204903](https://github.com/vaidyahimanshu502/guruji_nodeApp/assets/76218691/ba809887-5b73-4ac4-815c-a9b1d2fc629f)
     c. http://localhost:8000/todo/create [for creating todo with jwt authentication]---POST Request
     ![Screenshot 2023-06-03 205140](https://github.com/vaidyahimanshu502/guruji_nodeApp/assets/76218691/8799fdc7-a925-4197-97f5-6c4894aca3dd)
     d. http://localhost:8000/todo/get-todo [for getting all todos by logged-in user via jwt authentication] GET Request
     ![Screenshot 2023-06-03 205515](https://github.com/vaidyahimanshu502/guruji_nodeApp/assets/76218691/0e3874a2-dfac-4bac-af1d-dacbbf816800)
     e. http://localhost:8000/todo/:id/update_status/:status_id [for updating status of todo ] PUT Request
     ![Screenshot 2023-06-03 210351](https://github.com/vaidyahimanshu502/guruji_nodeApp/assets/76218691/53062e89-1cce-4f84-a13c-db45abc17726)
     f. http://localhost:8000/todo/update_data/:id [for updating data of tods] PUT Request
     ![Screenshot 2023-06-03 210850](https://github.com/vaidyahimanshu502/guruji_nodeApp/assets/76218691/940a5910-c886-4335-bf72-4ff7a211bcb1)
     g. http://localhost:8000/todo/:id/delete_item [for deleting item by jwt authentication]
     ![image](https://github.com/vaidyahimanshu502/guruji_nodeApp/assets/76218691/5a221f73-f7ee-4077-9ed1-840e99ede14d)
     h. http://localhost:8000/todo/filter_task/:status [filter task by status ]
     ![image](https://github.com/vaidyahimanshu502/guruji_nodeApp/assets/76218691/37d22458-068b-4977-97f4-17e657f74e20)
# API Paths for ADMIN SIGN_UP/LOG_IN
     a.http://localhost:8000/user/create  [admin sign in ]------ POST Request
     ![Screenshot 2023-06-03 212103](https://github.com/vaidyahimanshu502/guruji_nodeApp/assets/76218691/af193dc4-ec3f-435e-8d8b-b27442e4383a)
     b. http://localhost/user/log-in [for admin log in with generating jwt token]------ Post Request
     ![Screenshot 2023-06-03 212443](https://github.com/vaidyahimanshu502/guruji_nodeApp/assets/76218691/8a000692-7162-4ed0-b105-d484af409ec0)
     


     




