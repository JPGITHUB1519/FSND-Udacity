import hmac


def hash_str(s):
    # simuling hmac

    return hmac.new("hola", s).hexdigest()

print hash_str("hola")
