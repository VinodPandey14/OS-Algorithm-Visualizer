# algorithms/memory/best_fit.py

def best_fit(input_data):
    block_size = input_data["blocks"]
    process_size = input_data["processes"]
    
    allocation = [-1] * len(process_size)  # -1 means not allocated
    
    for i in range(len(process_size)):
        min_idx = -1
        min_size = float('inf')
        for j in range(len(block_size)):
            if process_size[i] <= block_size[j] and block_size[j] < min_size:
                min_size = block_size[j]
                min_idx = j
        if min_idx != -1:
            allocation[i] = min_idx
            block_size[min_idx] -= process_size[i]  # Decrease the block size
    
    return {
        "algorithm": "Best Fit",
        "allocation": allocation
    }
