from flask import  Flask
from models import *

app = Flask(__name__)

app.config['SECRET_KEY'] = "1111"
