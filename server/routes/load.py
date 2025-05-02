from flask import Blueprint
from controllers.load_controller import get_all_zones

load_bp = Blueprint('load_bp', __name__)

@load_bp.route('/')
def load_data():
    return get_all_zones()
