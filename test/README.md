# Installation

Install a Python environment to generate the tests.

Make sure you are in the project's ``./test`` folder.

## Create an environment

Create a venv folder:

```
$ python3 -m venv venv
```

## Activate the environment

```
$ . venv/bin/activate
```

## Install requirements dependencies

```
$ pip install requirements.txt -r
```

# Start the test

Check if the web application is running at `http://localhost:3000/`

```
$ pytest test_defaultSuite.py
```