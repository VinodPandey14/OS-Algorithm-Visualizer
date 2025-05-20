# algorithms/disk/cscan.py

def cscan(input_data):
    requests = input_data["requests"]
    initial_head = input_data["head"]
    disk_size = 200

    # Ensure the initial head is included in the requests list
    if initial_head not in requests:
        requests.append(initial_head)

    # Add the 0th and the last track to simulate the start and end of the disk
    requests.append(0)
    requests.append(disk_size - 1)

    # Sort the requests to process them in the correct order
    requests.sort()

    # Find the index of the initial head in the sorted requests list
    initial_head_index = requests.index(initial_head)
    left = requests[:initial_head_index]
    right = requests[initial_head_index+1:]

    seek_sequence = []
    total_seek_count = 0

    # Move towards the right end first
    for request in right:
        seek_count = abs(request - initial_head)
        total_seek_count += seek_count
        initial_head = request
        seek_sequence.append(request)

    # After reaching the right end, move to the leftmost and serve the requests
    initial_head = disk_size - 1
    for request in reversed(left):
        seek_count = abs(request - initial_head)
        total_seek_count += seek_count
        initial_head = request
        seek_sequence.append(request)

    return {
        "algorithm": "C-SCAN",
        "seek_sequence": seek_sequence,
        "total_seek_count": total_seek_count
    }
