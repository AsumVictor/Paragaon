from flask import jsonify
from queries.index import BASEQUERY
from queries.zone import get_all_zone_query


def get_all_zones():
    query = get_all_zone_query()
    data = BASEQUERY(query)
    response = [{"zoneId": zone[0], "zoneName": zone[1]} for zone in data]

    return jsonify({"success": True, "data": response})
