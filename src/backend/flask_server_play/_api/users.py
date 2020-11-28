class Users:
    """
    Template for a mysql table, which represents a user.
    Password is automatically hashed before saving.

    :param **kwargs - dictionary containing:
        :param email: unique required email-string value
        :param password: required string value, longer than 6 characters
        :param access: string: [free, premium, admin]
        :param use_case: string [work, life, school ... ]
        :param name: string username
        :param phone: optional string phone-number
  
    """

    def __init__(self, **kwargs):
        email = kwargs["email"]
        password = kwargs["password"]
        access = kwargs["access"]
        usecase = kwargs["use_case"]
        name = kwargs["name"]
        phone = kwargs["phone"]

    def generate_pw_hash(self):
        """
        Generates a password hash using ... method√
        """
    def save_data(self, user_dict: dict):
        """Saves customer data to mysql database
        """
    