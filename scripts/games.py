import chess.pgn
import random
import math
from tqdm import tqdm

# takes approximately ~10 minutes to run

pgn = open("games.pgn", "r")
positions = []

for i in tqdm(range(150_000)):
    game = chess.pgn.read_game(pgn)
    moves = game.mainline_moves()
    board = game.board()
    fen = ""

    ply_to_play = math.floor(16 + 20 * random.random()) & ~1

    ply_played = 0

    for move in moves:
        board.push(move)
        ply_played += 1
        if ply_played == ply_to_play:
            fen = board.fen()

    pieces_in_pos = sum(fen.lower().count(char) for char in "qbnr")

    if ply_played > ply_to_play + 20 * 2 and pieces_in_pos >= 10:
        positions.append(fen)

with open("games.txt", "w") as file:
    for string in positions:
        file.write(string + "\n")
