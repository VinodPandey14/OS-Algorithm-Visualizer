# algorithms/memory/worst.py

def worst_fit(input_data):
    block_size = input_data["blocks"]
    process_size = input_data["processes"]
    
    allocation = [-1] * len(process_size)  # -1 means not allocated
    
    for i in range(len(process_size)):
        max_idx = -1
        max_size = -1
        for j in range(len(block_size)):
            if process_size[i] <= block_size[j] and block_size[j] > max_size:
                max_size = block_size[j]
                max_idx = j
        if max_idx != -1:
            allocation[i] = max_idx
            block_size[max_idx] -= process_size[i]  # Decrease the block size
    
    return {
        "algorithm": "Worst Fit",
        "allocation": allocation
    }
