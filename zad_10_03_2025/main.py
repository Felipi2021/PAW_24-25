from typing import List, Tuple

def read_graph(filename: str) -> Tuple[List[List[int]], int]:
    try:
        with open(filename, 'r') as file:
            num_vertices = int(file.readline().strip())
            adjacency_list = []
            for _ in range(num_vertices):
                adjacency_list.append(list(map(int, file.readline().strip().split())))
        return adjacency_list, num_vertices
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found.")
        return [], 0
    except ValueError:
        print("Error: Invalid file format.")
        return [], 0

def write_neighbours_list(adjacency_list: List[List[int]]) -> None:
    for i, neighbours in enumerate(adjacency_list):
        print(f"Sąsiadami wierzchołka {i} są: {', '.join(map(str, neighbours))}")

def list_to_matrix(adjacency_list: List[List[int]], num_vertices: int) -> List[List[int]]:
    adjacency_matrix = [[0] * num_vertices for _ in range(num_vertices)]
    for i, neighbours in enumerate(adjacency_list):
        for neighbour in neighbours:
            if 0 <= neighbour < num_vertices:
                adjacency_matrix[i][neighbour] = 1
            else:
                print(f"Warning: Ignoring invalid edge from {i} to {neighbour}.")
    return adjacency_matrix

def write_matrix(adjacency_matrix: List[List[int]]) -> None:
    for row in adjacency_matrix:
        print(" ".join(map(str, row)))

def main() -> None:
    filename = "graph.txt"
    adjacency_list, num_vertices = read_graph(filename)
    if num_vertices == 0:
        print("Error: No valid graph data loaded.")
        return
    print("Lista sąsiedztwa:")
    write_neighbours_list(adjacency_list)
    adjacency_matrix = list_to_matrix(adjacency_list, num_vertices)
    print("\nMacierz sąsiedztwa:")
    write_matrix(adjacency_matrix)

if __name__ == "__main__":
    main()
