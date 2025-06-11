def scan(input_data):
    requests = input_data["requests"]
    initial_head = input_data["head"]
    disk_size = 200

    if initial_head not in requests:
        requests.append(initial_head)
    requests.append(0)
    requests.append(disk_size - 1)
    requests.sort()

    initial_index = requests.index(initial_head)
    left = requests[:initial_index][::-1]
    right = requests[initial_index + 1:]

    seek_sequence = [initial_head] + left + right
    seek_distances = []
    total_seek_count = 0
    current_position = initial_head

    for req in left + right:
        seek_count = abs(req - current_position)
        seek_distances.append(seek_count)
        total_seek_count += seek_count
        current_position = req

    max_seek_range = max(requests) - min(requests) if requests else 0
    worst_case_seek = 2 * max_seek_range if max_seek_range > 0 else 1

    efficiency = 100 * (1 - (total_seek_count / worst_case_seek))
    if efficiency < 0:
        efficiency = 0

    return {
        "algorithm": "SCAN",
        "initial_head": initial_head,
        "seek_sequence": seek_sequence,
        "seek_distances": seek_distances,
        "total_seek_count": total_seek_count,
        "efficiency": round(efficiency, 2)
    }
