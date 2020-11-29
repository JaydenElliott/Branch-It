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

    def get_treevy_ids(self, user_id):
        """
        Gets the treevy ids associated with a particular user_id
        """
        return self.sql.fetch(
            util.get_treevy_ids.format(
                user_id=user_id
            )
        )
    
    def get_treevy_json(self, treevy_id: int) -> str:
        """
        Returns the treevy JSON associated with the given treevy_id.
        """
        pass #TODO
    
    def insert_treevy(self, user_id: int, treevy: str) -> Union[int, None]:
        #Note that treevy type is a stirng. When inserting a JSON object into MySQL, it is a string.
        """
        Inserts a treevy with the foreign key user_id linking the treevy to a user.

        Returns treevy_id of newly inserted treevy or None if not successfully inserted.
        """
        response = self.sql.do(
            util.insert_treevy.format(
                user_id=user_id,
                treevy=treevy
            )
        )

        if (response):
            return self.get_treevy_ids(user_id)[-1][0]  # Last item of the list should be the newest inserted
        else:
            return None

    def update_treevy(self, treevy_id: int, treevy: str) -> bool:
        """
        Updates treevy JSON with the provided treevy JSON.
        """
        pass #FIX: Write util.update_treevy

    
    def delete_treevy(self, treevy_id):
        """
        Deletes the a treevy using the given treevy_id.

        WARNING: will return true even if treevy_id does not exist.
        """
        return self.sql.do(
            util.delete_treevy.format(
                treevy_id=treevy_id
            )
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

treevy = '{"what":"this"}'
# print(com.insert_user(user))
# print(com.update_user(1, user))
# print(com.get_user_id('John11@gmail.com'))
# print(com.delete_user(12))
# print(com.insert_treevy(1, treevy))
# print(com.get_treevy_ids(1))
# print(com.delete_treevy(1))