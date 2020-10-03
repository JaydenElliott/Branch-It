from setuptools import setup, find_packages

setup(
    name="treevy",
    version="0.0",
    description="To do list app with tree rendering",
    author="Jayden Elliott",
    author_email="Jayden.elliott@outlook.com",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    install_requres=[
        "flask",
        "flask-cors",
        "mysql-connector-python",

    ],
    extras_require={"dev": []},
)