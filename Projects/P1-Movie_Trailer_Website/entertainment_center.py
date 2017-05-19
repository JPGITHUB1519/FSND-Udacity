import fresh_tomatoes
import media

config = {"API_KEY": "da2ea44c"}

the_mask = media.Movie("The Mask",
                       "It revolves around an unlucky bank clerk finding the Mask of Loki",
                       "https://upload.wikimedia.org/wikipedia/en/4/4b/The_Mask_%28film%29_poster.jpg",
                       "https://www.youtube.com/watch?v=Pmainxd74ac",
                       "tt0110475")

hunger_games = media.Movie("Hunger Games",
                           "A really real reality show",
                           "https://2982-presscdn-29-70-pagely.netdna-ssl.com/wp-content/uploads/2015/11/The-Hunger-Games-Poster1.jpg",
                           "https://www.youtube.com/watch?v=mfmrPu43DF8",
                           "tt1392170")

rocky = media.Movie("Rocky",
                    "It tells the rags to riches American Dream story of Rocky Balboa",
                    "https://www.movieposter.com/posters/archive/main/228/MPW-114094",
                    "https://www.youtube.com/watch?v=7RYpJAUMo2M",
                    "tt0075148")

movies = [the_mask, hunger_games, rocky]
fresh_tomatoes.open_movies_page(movies)
