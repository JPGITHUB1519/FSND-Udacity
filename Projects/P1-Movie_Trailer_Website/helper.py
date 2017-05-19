import json
import requests

config = {
    "API_URL": "http://www.omdbapi.com/",
    "API_KEY": "da2ea44c"
}


def get_movie_data(imdb):
    """ Get the Json data for a movie """
    params = {"i": imdb, "apikey": config["API_KEY"]}
    data = json.loads(requests.get(url=config["API_URL"], params=params).text)
    return data

# print get_movie_data("tt0110475")
