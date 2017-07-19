from google.appengine.ext import ndb
from datetime import datetime, date
import json


class MyJsonEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, datetime) or isinstance(obj, date):
            return obj.isoformat()
        elif isinstance(obj, ndb.Key):
            # return obj.get().to_dict()
            # return obj.urlsafe()
            return obj.id()

        return json.JSONEncoder.default(self, obj)
