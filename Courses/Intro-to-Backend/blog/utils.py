import random
import hashlib
import string
import hmac

SECRET = "PYTHON"

###############
# User Authentication functions
##############


def make_salt():
    return ''.join(random.choice(string.letters) for x in xrange(5))

# make password hash


def generate_hash(name, pw, salt):
    return hashlib.sha256(name + pw + salt).hexdigest()

# this is the method to generate a hash to the user and password


def make_password_hash(name, pw):
    salt = make_salt()
    h = generate_hash(name, pw, salt)
    return '%s,%s' % (h, salt)

# verify if hash mash with a user


def valid_password(name, pw, h):
    obtain_salt = h.split(',')[1]
    test_h = generate_hash(name, pw, obtain_salt) + "," + obtain_salt
    if test_h == h:
        return True
    return False

###############
# Cookies Functions
##############


# def hash_str(s):
#     # simuling hmac

#     return hashlib.sha256(s + SECRET).hexdigest()

def hash_str(s):
    return hmac.new(SECRET, s).hexdigest()


def make_secure_val(s):
    return "%s|%s" % (s, hash_str(s))


def check_secure_val(h):
    lista = h.split('|')
    if hash_str(lista[0]) == lista[1]:
        return lista[0]
    return None

# return a random hah


def random_hash():
    random_word = make_salt()
    return hashlib.sha256(random_word + SECRET).hexdigest()


x = make_password_hash("jean", "1519")
