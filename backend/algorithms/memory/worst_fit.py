def worst_fit(input_data):
    block_size = input_data["blocks"]
    process_size = input_data["processes"]

    allocation = [-1] * len(process_size)
    original_blocks = list(block_size)
    memory_layout = []
    memory_pointer = 0
    block_map = [{"size": size, "used": False, "remaining": size, "index": i} for i, size in enumerate(block_size)]

    for pid, p_size in enumerate(process_size):
        max_fit = None
        for block in block_map:
            if not block["used"] or block["remaining"] >= p_size:
                if p_size <= block["remaining"]:
                    if max_fit is None or block["remaining"] > max_fit["remaining"]:
                        max_fit = block
        if max_fit:
            allocation[pid] = max_fit["index"]
            start = memory_pointer
            end = start + p_size
            memory_layout.append({
                "start": start,
                "end": end,
                "process": f"P{pid + 1}"
            })
            memory_pointer = end
            max_fit["remaining"] -= p_size
            max_fit["used"] = True

    total_memory = sum(original_blocks)
    used_memory = memory_pointer
    if used_memory < total_memory:
        memory_layout.append({
            "start": used_memory,
            "end": total_memory,
            "process": "Free"
        })

    return {
        "algorithm": "Worst Fit",
        "total_memory": total_memory,
        "memory_blocks": memory_layout,
        "allocation": allocation,
        "processes": [{"name": f"P{i+1}", "size": sz} for i, sz in enumerate(process_size)],
        "fragmentation": total_memory - used_memory
    }
