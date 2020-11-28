from setuptools import setup, find_packages

setup(
    name="treevy_backend",
    version="0.0",
    description="Backend of treevy: a to do list app with tree rendering. This python backend communicates with a MySQL database",
    author="Jayden Elliott, Ethal Askander",
    author_email="Jayden.Elliott@outlook.com, Ethal.Askander@outlook.com",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    install_requres=[
        "flask",
        "flask-cors",
        "mysql-connector-python",
    ],
    extras_require={"dev": []},
)