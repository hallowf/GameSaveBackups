import os, pickle, shutil, zipfile
from Database.fetch_all_games import generate_games

tmp_path = "tmp_saves"


## Function to copy save files to tmp folder requires a list with dicts as parameter "games"
def copy_saves_toTmp(games):
    if isinstance(games, list) and isinstance(games[0], dict):
        for game in games:
            if os.path.isdir(tmp_path + "/" + game["name"]):
                print("Removing old {} save files".format(game["name"]))
                shutil.rmtree(tmp_path + "/" + game["name"])
                print("Done")
            if os.path.isdir(game["path"]):
                print("Copying {} save files".format(game["name"]))
                shutil.copytree(game["path"], tmp_path + "/" + game["name"])
                print("Done")
    else:
        raise ValueError("Games parameter must be a list with dicts containing game attributtes")

## Function to make a zip archive # TODO: Replace shutil with a faster option,
## Add a index file with the paths for easier management
def make_zip_file(filename="ZippedBackups.zip"):
    if os.path.isfile(filename):
        print("Removig old zip")
        os.remove(filename)
        print("Done")
    if os.path.isdir(tmp_path):
        print("Making zip archive")
        shutil.make_archive(filename.replace(".zip", ""), "zip", root_dir=tmp_path)
        print("Done, Removing tmp_files")
        shutil.rmtree(tmp_path)


def read_zip_file(zipped="ZippedBackups.zip"):
    games = []
    zip_file = zipfile.ZipFile(zipped, "r")
    for folder in zip_file.namelist():
        if folder.endswith("/") == True and folder.count("/") == 1 and folder != "./":
            games.append(folder.replace("/", ""))
    zip_file.close()
    return games


def check_if_zipped(games, zipped=read_zip_file()):
    for game in games:
        if game["name"] in zipped:
            print("Game:", game["name"])


def append_to_zip(games, zipped="ZippedBackups.zip", overwrite=False):
    if overwrite == False:
        zip_file = zipfile.ZipFile(zipped, "r")
        zipped_dirs = zip_file.namelist()
        for folder in zipped_dirs:
            if folder.endswith("/") == True and folder.count("/") == 1 and folder != "./":
                if folder not in games:
                    print(folder)


def delete_from_list(games, name):
    i = 0
    for game in games:
        if game["name"] == name and name != None:
            del games[i]
            print("lel")
        i = i + 1
    print(games)

#copy_saves_toTmp(generate_games())
#copy_saves_toTmp(pickle.load(open("games.pckl", "rb")))
#make_zip_file()
#check_if_zipped(pickle.load(open("games.pckl", "rb")))
#print(read_zip_file("ZippedBackups.zip"))
#delete_from_list(pickle.load(open("games.pckl", "rb")))
append_to_zip(pickle.load(open("games.pckl", "rb")))
