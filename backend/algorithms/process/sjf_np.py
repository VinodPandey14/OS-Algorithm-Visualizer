def sjf_non_preemptive(input_data):
    processes = []
    for i in range(len(input_data["arrival"])):
        processes.append({
            "pid": i + 1,
            "arrival_time": input_data["arrival"][i],
            "burst_time": input_data["burst"][i]
        })

    processes.sort(key=lambda x: x["arrival_time"])
    current_time = 0
    result = []
    completed = 0
    is_completed = [False] * len(processes)

    while completed < len(processes):
        ready_queue = [p for i, p in enumerate(processes)
                       if p["arrival_time"] <= current_time and not is_completed[i]]
        if ready_queue:
            ready_queue.sort(key=lambda x: x["burst_time"])
            current_process = ready_queue[0]
            i = processes.index(current_process)

            start_time = max(current_time, current_process["arrival_time"])
            completion_time = start_time + current_process["burst_time"]
            turnaround_time = completion_time - current_process["arrival_time"]
            waiting_time = turnaround_time - current_process["burst_time"]

            result.append({
                "pid": current_process["pid"],
                "arrival_time": current_process["arrival_time"],
                "burst_time": current_process["burst_time"],
                "start_time": start_time,
                "completion_time": completion_time,
                "turnaround_time": turnaround_time,
                "waiting_time": waiting_time
            })

            current_time = completion_time
            is_completed[i] = True
            completed += 1
        else:
            current_time += 1

    avg_waiting_time = sum(p["waiting_time"] for p in result) / len(result)
    avg_turnaround_time = sum(p["turnaround_time"] for p in result) / len(result)

    return {
        "algorithm": "SJF Non-Preemptive",
        "results": result,
        "average_waiting_time": avg_waiting_time,
        "average_turnaround_time": avg_turnaround_time
    }
