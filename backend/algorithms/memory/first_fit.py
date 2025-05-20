# algorithms/memory/first.py

def first_fit(input_data):
    block_size = input_data["blocks"]
    process_size = input_data["processes"]
    
    allocation = [-1] * len(process_size)  # -1 means not allocated
    
    for i in range(len(process_size)):
        for j in range(len(block_size)):
            if process_size[i] <= block_size[j]:
                allocation[i] = j
                block_size[j] -= process_size[i]  # Decrease the block size
                break
    
    return {
        "algorithm": "First Fit",
        "allocation": allocation
    }
