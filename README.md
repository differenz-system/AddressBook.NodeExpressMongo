# AddressBook.NodeExpressMongo

## Overview
This repository contains **Address Book** application for NodeExpress that shows design & coding practices followed by **[Differenz System](http://www.differenzsystem.com/)**.

The app does the following:
1. **Login:** User can login via email/password. 
2. **Home:** It will list all the save contacts, having the option to add a new contact.
3. **Create new contact:** User can add a new contact to his address book by filling details here.

## Pre-requisites

-[Visual Studio code](https://code.visualstudio.com/)

-[ Node js ](https://nodejs.org/en/)

-[ TypeScript ](http://typescript.org/)

-[ Mongodb ](https://www.npmjs.com/package/mongodb)


## Getting Started
1. [Install Visual Studio code](https://code.visualstudio.com/)
2. Clone this sample repository
3. Open Terminal, go to location of the repo
4. Enter command "npm install" (make sure to go inside project first)
5. Enter command "npm start node".


## Key Tools & Technologies
- **Database:** Mongodb
- **Authentication:** login
- **API/Service calls:** fetch API
- **IDE:**  VSCode
- **Framework:** Node js

## Troubleshooting
### (VS Code)While running command (npm start node), you are expected to have given error: "launchPackager.command" can't be opened.
To resolve this you can attempt given steps:

Go to package.json->Script :"start":"./server.js"




## API
###
Registration:
http://192.168.1.105:8800/registration

-req:
```
     {
	"email":"john@gmail.com",
	"password":"john@123"
	}
 ```
-res:
```
	{
      "res": "0",
      "msg": "You are Successfully Registered.",
      "data": 
      {
            "_id": "6058215ed902300329c86d3e",
            "email": "john@gmail.com",
            "user_id": "6058215ed902300329c86d3e"
      }
    }
	{
    "res": "1",
    "msg": "Email already exists"
    }
```

###
login:
http://192.168.1.105:8800/login

-req:
```
    {
        "email":"john@gmail.com",
        "password":"john@123"
    }
```
-res:
```
    {
          "res": "0",
          "msg": "You are Successfully Logged in!",
          "data": 
          {
              "_id": "6055e75470519f1031811a80",
              "email": "john@gmail.com",
             "user_id": "6055d191ed47810d4815ec07"

          }
    }
    {
         "res": "1",
         "msg": "Invalid Email or Password"
    }
```
###
Display addressbook:
http://192.168.1.105:8800/getAddressBookByID/:userid

-res:
```
   {
    "res": "0",
    "msg": "Successfully Displayed",
    "data": [
        {
            "name": "Lata",
            "email": "lata@gmail.com",
            "contact_number": "7896541230",
            "is_active": "0",
            "create_date": "2021/2/20",
            "user_id": "6055d191ed47810d4815ec07",
            "is_deleted": 0,
            "__v": 0
        },
        {
            "name": "John",
            "email": "john@gmail.com",
            "contact_number": "7896541230",
            "is_active": "0",
            "create_date": "2021/2/22",
            "user_id": "6055d191ed47810d4815ec07",
            "is_deleted": 0,
            "__v": 0
        }
    ]
}

If Address does not exist in a Address Book of a particular user.

{
    "res": "0",
    "msg": "Successfully Displayed",
    "data": []
}

```
###
Add Address
http://192.168.1.105:8800/createAddressBook

-req:
```
  {
    "name":"Harsh",
    "email":"harsh123@gmail.com",
    "contact_number":"9898243555",
    "is_active":"true",
    "userid":"6055e75470519f1031811a80"
  }
```
-res:
```
{
    "res": "0",
    "msg": "Data Saved Successfully",
    "data": {
        "_id": "6058255ad902300329c86d40",
        "name": "Harsh",
        "email": "harsh123@gmail.com",
        "contact_number": "9898243555",
        "is_active": "0",
        "create_date": "2021/2/22",
        "user_id": "6055e75470519f1031811a80",
        "is_deleted": 0,
        "__v": 0
    }
}
```
###
Update Address 
http://192.168.1.105:8800/updateAddressBook/:userid/:addressid

-req:
```
 {
    "name":"John Sam",
    "email":"john@gmail.com",
    "contact_number":"8876567894",
    "is_active":"0",
    "create_date":"2021/2/22",
    "is_deleted":0
}
```
-res:
```	
   {
    "res": "0",
    "msg": "Data Updated Successfully",
    "data": [
        {
            "_id": "605847b8fe4a0e069417a4de",
            "name": "John Sam",
            "email": "john@gmail.com",
            "contact_number": "8876567894",
            "is_active": "0",
            "create_date": "2021/2/22",
            "user_id": "605846adfe4a0e069417a4db",
            "is_deleted": 0,
            "__v": 0
        }
    ]
}
```
###
Remove Address
http://192.168.1.105:8800/removeAddressBook/:userid/addressid

-res
 ```
{
    "res": "0",
    "msg": "Data Removed Successfully"
}
```




## Support
If you've found an error in this sample, please [report an issue](https://github.com/differenz-system/AddressBook.NodeExpressMongo). You can also send your feedback and suggestions at info@differenzsystem.com

Happy coding!
