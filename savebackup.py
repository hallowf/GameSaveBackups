import tempfile
import os
import zipfile
import shutil
import pathlib
from Database import database
from read_zip import read_zip_file, read_tmp_path

tmp_dir = pathlib.Path('.\\tmp_saves').mkdir(parents=True, exist_ok=True)

tmp_path = "tmp_saves"

def check_game():
    for game_exists in database.save_database:
        if os.path.isdir(game_exists.path):
            yield game_exists.to_dict()
        else:
            print ("could not find ", game_exists.name)


def make_backup(game):
    if os.path.isdir(os.path.join(tmp_path + game["name"])):
        print ("Removing old tmp files")
        shutil.rmtree(tmp_path + game["name"])
        print ("Removed old tmp files")
    else:
        print ("No need to remove old temp files")
    try:
        print ("Making new tmp files at: ", tmp_path)
        shutil.copytree(game["path"], tmp_path + "\\" + game["name"],)
        print("Made tmp files")
    except:
        print ("can't make tmp files")


def make_zip():
    if os.path.isfile("zippedBackups.zip"):
        print ("Checking games")
        os.remove("zippedBackups.zip")
        print ("Done")
    else:
        print ("No need to remove old backups")
    if os.path.isdir(tmp_path):
        print("Making zip archive")
        shutil.make_archive("zippedBackups", "zip", root_dir=tmp_path)
        print("Done, removing temp files")
        shutil.rmtree(tmp_path)
    else:
        print ("can't make archive")


def add_to_zip():
    if os.path.isfile("zippedBackups.zip"):
        print("Checking games")
        saves_list = list(set(read_zip_file("zippedBackups.zip")))
        tmp_path_list = read_tmp_path(tmp_path)
        for game in tmp_path_list:
            if game in saves_list:
                print("You are trying to add an existing game, returning...")
            else:
                print("Adding game" + game + " to zip" )
                z = zipfile.ZipFile("zippedBackups.zip", "a", zipfile.ZIP_DEFLATED)
                for dirname, subdirs, files in os.walk(tmp_path + game + "\\"):
                    game_dir = game + "\\"
                    z.write(tmp_path + game_dir, game_dir)
                    for filename in files:
                        z.write(os.path.join(game_dir, dirname + "\\" + filename))
                z.close()
                print("done")
