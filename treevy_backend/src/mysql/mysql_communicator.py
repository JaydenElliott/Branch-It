from typing import Union
from mysql_handler import MySQLHandler;
import util

class MySQLCommunicator:
    """
    Contains methods to communicate/insert/delete items from database.
    """
    def __init__(self):
        """
        Sets up MySQL handler.
        """
        self.sql = MySQLHandler(db=util.mysql_details["treevy_database"])

    def get_user_id(self, email: str) -> Union[int, None]:
        """
        Gets the user_id of the user with the given email or None if they do not exist.
        """
        # Obtain user id and return it
        response = self.sql.fetch(util.get_user_id.format(email=email))
        if (response):
            # If resposne is not None
            return self.sql.fetch(util.get_user_id.format(email=email))[0][0]
        else:
            return None
    
    def insert_user(self, user_details : dict) -> Union[int, None]:
        """
        Inserts the provided user details into the relevant database user table.
        Returns the user_id of the inserted user or None if unsuccessful.

        Dictionary contents:
        {
            username VARCHAR(16),
            email VARCHAR(50),
            access VARCHAR(16),
            use_case VARCHAR(16),
            phone VARCHAR(12),
            password VARCHAR(64),
        }
        """

        # Insert user data
        self.sql.do(
            util.insert_user.format(
                username = user_details["username"],
                email = user_details["email"],
                access = user_details["access"],
                use_case = user_details["use_case"],
                phone = user_details["phone"],
                password = user_details["password"]
            )
        )

        # Obtain user id and return it
        return self.get_user_id(user_details["email"])

    def update_user(self, user_id: int, user_details: dict) -> bool:
        """
        Updates user details with the provided user details.
        """
        # Updating user details
        return self.sql.do(
            util.update_user.format(
                username = user_details["username"],
                email = user_details["email"],
                access = user_details["access"],
                use_case = user_details["use_case"],
                phone = user_details["phone"],
                password = user_details["password"],
                user_id = user_id
            )
        )

    def delete_user(self, user_id: int) -> bool:
        """
        Deletes a user with the provided user_id.

        WARNING: will return true even if the user does not exist.
        """
        return self.sql.do(
            util.delete_user.format(user_id=user_id)
        )

# For testing
com = MySQLCommunicator()
user = {
        "username":"John",
        "email":"John11@gmail.com",
        "access":"standard",
        "use_case":"professional",
        "phone":"0000000000",
        "password":"password"
        }
# print(com.insert_user(user))
# print(com.update_user(1, user))
# print(com.get_user_id('John11@gmail.com'))
# print(com.delete_user(12))