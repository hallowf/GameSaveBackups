from steam import SteamID
import time

def convert_id(user_id):
    uid = SteamID(user_id)
    if uid.is_valid():
        return str(uid.id)
    else:
        raise ValueError("The id/url you submitted is either incorrect or invalid")

def convert_id_from_url(the_url):
    uid = False
    uid = SteamID.from_url(the_url, http_timeout=9)
    wait_time = time.time() + 10
    while True:
        if time.time() < wait_time and uid == None:
            continue
        elif uid != None:
            return str(uid.id)
        else:
            uid = False
            raise ValueError("The id/url you submitted is either incorrect or invalid")
