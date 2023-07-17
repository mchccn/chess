from stockfish import Stockfish
from tqdm import tqdm
from os import sys

stockfish = Stockfish()

positions = []

num = 0

line_count = sum(1 for _ in open("games.txt", "r"))

with open("games.txt", "r") as file:
    for line in tqdm(file, total=line_count):
        fen = line.rstrip()

        num += 1

        stockfish.set_fen_position(fen)

        evaluation = stockfish.get_evaluation()

        out = str(num).zfill(5) + " " + str(evaluation["value"]).zfill(4) + " " + fen

        if evaluation["type"] == "cp":
            positions.append(out)

positions.sort(key=lambda l: abs(int(l.split(" ")[1])))

with open("matches.txt", "w") as file:
    for string in positions:
        file.write(string + "\n")
