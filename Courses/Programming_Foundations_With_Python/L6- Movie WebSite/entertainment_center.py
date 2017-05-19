import fresh_tomatoes
import media

toy_story = media.Movie("Toy Story",
                        "A story of a boy and his toys that come to life",
                        "http://www.impawards.com/1995/posters/toy_story_ver1.jpg",
                        "https://www.youtube.com/watch?v=KYz2wyBy3kc")

avatar = media.Movie("Avatar",
                     "A Marine on an Alien Planet",
                     "http://s3.foxmovies.com/foxmovies/production/films/18/images/posters/251-asset-page.jpg",
                     "https://www.youtube.com/watch?v=5PSNL1qE6VY")

titanic = media.Movie("Titanic",
                      "A fictionalized account of the sinking of the RMS Titanic",
                      "https://cdn.traileraddict.com/content/paramount-pictures/titanic.jpg",
                      "https://www.youtube.com/watch?v=2e-eXJ6HgkQ")

shool_of_rock = media.Movie("School of Rock",
                            "Using Rock music to learn",
                            "https://upload.wikimedia.org/wikipedia/en/1/11/School_of_Rock_Poster.jpg",
                            "https://www.youtube.com/watch?v=3PsUJFEBC74")

ratatouille = media.Movie("Ratatouille",
                          "A rat is chef in paris",
                          "http://www.pixartalk.com/wp-content/uploads/2009/06/ratus1.jpg",
                          "https://www.youtube.com/watch?v=niD-jahFURU")

midnight_in_paris = media.Movie("Midnight In Paris",
                                "Going back in time to meet Authors",
                                "https://upload.wikimedia.org/wikipedia/en/9/9f/Midnight_in_Paris_Poster.jpg",
                                "https://www.youtube.com/watch?v=FAfR8omt-CY")

hunger_games = media.Movie("Hunger Games",
                           "A really real reality show",
                           "https://2982-presscdn-29-70-pagely.netdna-ssl.com/wp-content/uploads/2015/11/The-Hunger-Games-Poster1.jpg",
                           "https://www.youtube.com/watch?v=mfmrPu43DF8")

movies = [avatar, titanic, shool_of_rock,
          ratatouille, midnight_in_paris, hunger_games]
fresh_tomatoes.open_movies_page(movies)
