# algorithms/disk/fcfs.py

def disk_fcfs(input_data):
    requests = input_data["requests"]
    initial_head = input_data["head"]

    seek_sequence = []
    total_seek_count = 0
    current_position = initial_head

    for request in requests:
        seek_count = abs(request - current_position)
        total_seek_count += seek_count
        current_position = request
        seek_sequence.append(request)

    return {
        "algorithm": "FCFS",
        "seek_sequence": seek_sequence,
        "total_seek_count": total_seek_count
    }
