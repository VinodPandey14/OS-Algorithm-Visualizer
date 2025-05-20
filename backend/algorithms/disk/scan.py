# algorithms/disk/scan.py

def scan(input_data):
    requests = input_data["requests"]
    initial_head = input_data["head"]
    disk_size = 200

     # Ensure the initial head is included in the requests list
    if initial_head not in requests:
        requests.append(initial_head)

    requests.append(0)  # Add the 0th position (start of the disk)
    requests.append(disk_size - 1)  # Add the maximum disk size position (end of the disk)

    requests.sort()

    initial_head_index = requests.index(initial_head)
    left = requests[:initial_head_index]
    right = requests[initial_head_index+1:]

    seek_sequence = []
    total_seek_count = 0

    # Move towards the left end first
    for request in reversed(left):
        seek_count = abs(request - initial_head)
        total_seek_count += seek_count
        initial_head = request
        seek_sequence.append(request)

    # Then move towards the right end
    for request in right:
        seek_count = abs(request - initial_head)
        total_seek_count += seek_count
        initial_head = request
        seek_sequence.append(request)

    return {
        "algorithm": "SCAN",
        "seek_sequence": seek_sequence,
        "total_seek_count": total_seek_count
    }
