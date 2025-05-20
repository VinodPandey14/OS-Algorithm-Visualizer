def round_robin(input_data, quantum):
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
    queue = []
    remaining_burst_time = [p["burst_time"] for p in processes]
    while any(remaining_burst_time):
        for i, process in enumerate(processes):
            if process["arrival_time"] <= current_time and remaining_burst_time[i] > 0:
                if remaining_burst_time[i] > quantum:
                    current_time += quantum
                    remaining_burst_time[i] -= quantum
                else:
                    current_time += remaining_burst_time[i]
                    remaining_burst_time[i] = 0

                start_time = current_time - quantum
                completion_time = current_time
                turnaround_time = completion_time - process["arrival_time"]
                waiting_time = turnaround_time - process["burst_time"]
                result.append({
                    "pid": process["pid"],
                    "arrival_time": process["arrival_time"],
                    "burst_time": process["burst_time"],
                    "start_time": start_time,
                    "completion_time": completion_time,
                    "turnaround_time": turnaround_time,
                    "waiting_time": waiting_time
                })

    avg_waiting_time = sum(p["waiting_time"] for p in result) / len(result)
    avg_turnaround_time = sum(p["turnaround_time"] for p in result) / len(result)

    return {
        "algorithm": "Round Robin",
        "results": result,
        "average_waiting_time": avg_waiting_time,
        "average_turnaround_time": avg_turnaround_time
    }
