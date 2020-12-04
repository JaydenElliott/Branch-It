# Flask Python Backend API

## <u>/api/</u>
<b>Blueprint for all api calls</b>

### <u>/api/users</u>
<b>Retrieves user data provided an email</b>

params: 
    - e: email

### <u>/api/users/login</u>
<b>Retrieves user data provided an email and password</b>

json: {"email", "password"}