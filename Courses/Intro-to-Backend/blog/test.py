import hmac


def hash_str(s):
    # simuling hmac

    return hmac.new(SECRET, s).hexdigest()

print hash_str("hola")
