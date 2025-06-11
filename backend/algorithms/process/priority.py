def priority_preemptive(input_data):
    processes = []
    for i in range(len(input_data["arrival"])):
        processes.append({
            "pid": i + 1,
            "arrival_time": input_data["arrival"][i],
            "burst_time": input_data["burst"][i],
            "priority": input_data["priority"][i]
        })

    processes.sort(key=lambda x: x["arrival_time"])
    current_time = 0
    completed = 0
    result = []
    remaining_burst_time = [p["burst_time"] for p in processes]
    start_times = [-1] * len(processes)

    while completed < len(processes):
        ready_queue = [p for p in processes if p["arrival_time"] <= current_time and remaining_burst_time[processes.index(p)] > 0]
        if ready_queue:
            ready_queue.sort(key=lambda x: x["priority"])
            current_process = ready_queue[0]
            i = processes.index(current_process)

            if start_times[i] == -1:
                start_times[i] = current_time

            remaining_burst_time[i] -= 1
            current_time += 1

            if remaining_burst_time[i] == 0:
                completion_time = current_time
                turnaround_time = completion_time - current_process["arrival_time"]
                waiting_time = turnaround_time - current_process["burst_time"]
                result.append({
                    "pid": current_process["pid"],
                    "arrival_time": current_process["arrival_time"],
                    "burst_time": current_process["burst_time"],
                    "start_time": start_times[i],
                    "completion_time": completion_time,
                    "turnaround_time": turnaround_time,
                    "waiting_time": waiting_time
                })
                completed += 1
        else:
            current_time += 1

    avg_waiting_time = sum(p["waiting_time"] for p in result) / len(result)
    avg_turnaround_time = sum(p["turnaround_time"] for p in result) / len(result)

    return {
        "algorithm": "Priority Scheduling Preemptive",
        "results": result,
        "average_waiting_time": avg_waiting_time,
        "average_turnaround_time": avg_turnaround_time
    }
