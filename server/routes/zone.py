from flask import Blueprint
from controllers.zone_controller import get_all_zones

zone_bp = Blueprint('zone_bp', __name__)

@zone_bp.route('/')
def zone_data():
    return get_all_zones()
