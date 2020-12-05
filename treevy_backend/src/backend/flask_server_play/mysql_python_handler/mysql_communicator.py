from typing import Union
from .mysql_handler import MySQLHandler;
from . import util

class MySQLCommunicator:
    """
    Contains methods to communicate/insert/delete items from database.
    """
    def __init__(self, db=util.mysql_details["treevy_database"]):
        """
        Sets up MySQL handler.
        """
        self.sql = MySQLHandler(db)

    def get_user_id(self, email: str) -> Union[int, None]:
        """
        Gets the user_id of the user with the given email or None if they do not exist.
        """
        try:
            # Obtain user id and return it
            response = self.sql.fetch(util.get_user_id.format(email=email))
            if (response):
                # If resposne is not None
                return self.sql.fetch(util.get_user_id.format(email=email))[0][0]
            else:
                return None
        except Exception as e:
            print('Error {}'.format(e))
            return None
    
    def get_user_details_from_id(self, user_id: int) -> Union[list, None]:
        """
        Gets the user details of the provided user_id.
        """
        try:
            response = self.sql.fetch(
                util.get_user_details_from_id.format(
                    user_id=user_id
                )
            )

            # Check that response is not empty
            return response if len(response) > 0 else None
        except Exception as e:
            print('Error {}'.format(e))
            return None

    def get_user_details_from_email(self, email: str) -> Union[list, None]:
        """
        Gets the user details of the provided email.
        """
        try:
            response = self.sql.fetch(
                util.get_user_details_from_email.format(
                    email=email
                )
            )

            # Check that response is not empty
            return response if len(response) > 0 else None
        except Exception as e:
            print('Error {}'.format(e))
            return None

    def insert_user(self, user_details : dict) -> Union[int, None]:
        """
        Inserts the provided user details into the relevant database user table.

        Returns the user_id of the inserted user or None if unsuccessful.

        Expected insert dictionary contents:
        {
            username VARCHAR(16),
            email VARCHAR(50),
            access VARCHAR(16),
            use_case VARCHAR(16),
            phone VARCHAR(12),
            password VARCHAR(64)
        }
        """

        try:
            # Insert user data
            response = self.sql.do(
                util.insert_user.format(
                    username = user_details["username"],
                    email = user_details["email"],
                    access = user_details["access"],
                    use_case = user_details["use_case"],
                    phone = user_details["phone"],
                    password = user_details["password"]
                )
            )

            # Ensure response was True
            assert (response), 'insert_user failed with {}'.format(user_details)

            # Obtain user id and return it
            return self.get_user_id(user_details["email"])
        except Exception as e:
            print('Error: {}'.format(e))
            return None

    def update_user(self, user_id: int, user_details: dict) -> bool:
        """
        Updates user details with the provided user details.
        """
        try:
            # Ensure user exists
            assert (self.get_user_details(user_id)), "user_id {} does not exist".format(user_id)

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
        except Exception as e:
            print('Error: {}'.format(e))
            return False

    def set_user_delete_timestamp(self, user_id: int) -> bool:
        """
        Sets a user with the provided user_id's deletion timestamp to the current time.
        """
        try:
            # Ensure user exists
            assert (self.get_user_details(user_id)), "user_id {} does not exist".format(user_id)

            return self.sql.do(
                util.set_user_delete_timestamp.format(user_id=user_id)
            )
        except Exception as e:
            print('Error: {}'.format(e))
            return False

    def delete_user(self, user_id: int) -> bool:
        """
        Permanently deletes the user from the database. 
        """
        try:
            # Ensure user exists
            assert (self.get_user_details(user_id)), "user_id {} does not exist".format(user_id)

            return self.sql.do(
                util.delete_user.format(user_id=user_id)
            )
        except Exception as e:
            print('Error: {}'.format(e))
            return False

    def get_treevy_ids(self, user_id) -> Union[list, None]:
        """
        Gets the treevy ids associated with a particular user_id
        """
        try:
            response = self.sql.fetch(
                util.get_treevy_ids.format(
                    user_id=user_id
                )
            )

            # Check that response is not empty
            return response if len(response) > 0 else None
        except Exception as e:
            print('Error {}'.format(e))
            return None

    def get_treevy_details(self, treevy_id: int) -> Union[list, None]:
        """
        Gets the treevy row details of the given treevy_id.

        WARNING: the treevy entry's deletion timestamp may have been set.
        """
        try:
            # Fetch the data
            response = self.sql.fetch(
                util.get_treevy_details.format(
                    treevy_id=treevy_id
                )
            )

            # Check that response is not empty
            return response if len(response) > 0 else None
        except Exception as e:
            print('Error {}'.format(e))
            return None
    
    def get_treevy(self, treevy_id: int) -> Union[str, None]:
        """
        Returns the treevy JSON associated with the given treevy_id.

        WARNING: the treevy's deletion timestamp may have been set.
        """
        # Fetch the data
        try:
            response = self.sql.fetch(
                util.get_treevy.format(
                    treevy_id=treevy_id
                )
            )
            
            #Check if response was None
            if (response):
                return response[0][0]   # Getting the JSON from the double list
            else:
                return None
        except Exception as e:
            print('Error {}'.format(e))
            return None
    
    def insert_treevy(self, user_id: int, treevy: str) -> Union[int, None]:
        #Note that treevy type is a stirng. When inserting a JSON object into MySQL, it is a string.
        """
        Inserts a treevy with the foreign key user_id linking the treevy to a user.

        Returns treevy_id of newly inserted treevy or None if not successfully inserted.

        Expected insert dictionary contents:
        {
            user_id INT unsigned NOT NULL,
            treevy JSON,
        }
        """
        try:
            response = self.sql.do(
                util.insert_treevy.format(
                    user_id=user_id,
                    treevy=treevy
                )
            )

            # Ensure successful
            assert (response), 'insert_treevy failed with user_id {} and treevy {}'.format(user_id, treevy)

            return self.get_treevy_ids(user_id)[-1][0]  # Last item of the list should be the newest inserted
        except Exception as e:
            print('Error {}'.format(e))
            return None

    def update_treevy(self, treevy_id: int, treevy: str) -> bool:
        """
        Updates treevy JSON with the provided treevy JSON.
        """
        try:
            # Check that the treevy_id exists
            assert (self.get_treevy(treevy_id)), 'treevy_id {} does not exist'.format(treevy_id)

            # Updating treevy JSON details
            return self.sql.do(
                util.update_treevy.format(
                    treevy_id=treevy_id,
                    treevy=treevy
                )
            )
        except Exception as e:
            print('Error {}'.format(e))
            return False
    
    def set_treevy_delete_timestamp(self, treevy_id) -> bool:
        """
        Sets a treevy with the provided treevy_id's deletion timestamp to the current time.
        """

        # Check that the treevy_id exists
        try:
            # Ensure that treevy being deleted exists
            assert self.get_treevy(treevy_id), 'treevy_id {} does not exist'.format(treevy_id) 

            return self.sql.do(
                util.set_treevy_delete_timestamp.format(
                    treevy_id=treevy_id
                )
            )
        except Exception as e:
            print('Error {}'.format(e))
            return False
    
    def delete_treevy(self, treevy_id: int) -> bool:
        """
        Permanently deletes the treevy using the given treevy_id.
        """
        try:
            # Ensure treevy exists
            assert (self.get_treevy_details(treevy_id)), "treevy_id {} does not exist".format(treevy_id)

            return self.sql.do(
                util.delete_treevy.format(treevy_id=treevy_id)
            )
        except Exception as e:
            print('Error: {}'.format(e))
            return False

# FIX: Delete later. Purpose was for testing
# com = MySQLCommunicator()
# user = {
#         "username":"John",
#         # "email":"John1@gmail.com",
#         # "email":None,
#         "access":"standard",
#         "use_case":"professional",
#         "phone":"0000000000",
#         "password":"password"
#         }

# treevy = '{"whdddddddat":"wwww"}'
# print(com.insert_user(user))
# print(com.update_user(9, user))
# print(com.get_user_id('John11@gmail.com'))
# print(com.set_user_delete_timestamp(12))
# print(com.insert_treevy(9, treevy))
# print(com.get_treevy_ids(9))
# print(com.set_treevy_delete_timestamp(5))
# print(com.get_treevy(1))
# print(com.update_treevy(5, treevy))
# print(com.get_user_details(1))
# print(com.get_treevy_details(12))
# print(com.delete_treevy(2))