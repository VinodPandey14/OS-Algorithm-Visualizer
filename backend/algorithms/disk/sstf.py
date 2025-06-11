def sstf(input_data):
    requests = input_data["requests"]
    initial_head = input_data["head"]
    requests = requests.copy()
    current_position = initial_head
    seek_sequence = [initial_head]
    seek_distances = []
    total_seek_count = 0

    while requests:
        closest = min(requests, key=lambda r: abs(r - current_position))
        seek_count = abs(closest - current_position)
        seek_sequence.append(closest)
        seek_distances.append(seek_count)
        total_seek_count += seek_count
        current_position = closest
        requests.remove(closest)

    max_seek_range = max(requests) - min(requests) if requests else 0
    worst_case_seek = 2 * max_seek_range if max_seek_range > 0 else 1

    efficiency = 100 * (1 - (total_seek_count / worst_case_seek))
    if efficiency < 0:
        efficiency = 0
        
    return {
        "algorithm": "SSTF",
        "initial_head": initial_head,
        "seek_sequence": seek_sequence,
        "seek_distances": seek_distances,
        "total_seek_count": total_seek_count,
        "efficiency": round(efficiency, 2)
    }
