def fcfs(input_data):
    # Ensure the number of arrival times and burst times match
    if len(input_data["arrival"]) != len(input_data["burst"]):
        raise ValueError("Arrival times and burst times must have the same length.")

    # Create a list of processes
    processes = []
    for i in range(len(input_data["arrival"])):
        processes.append({
            "pid": i + 1,  # Process IDs start from 1
            "arrival_time": input_data["arrival"][i],
            "burst_time": input_data["burst"][i]
        })

    # Sort processes by arrival time
    processes.sort(key=lambda x: x["arrival_time"])

    current_time = 0
    result = []

    for process in processes:
        arrival = process["arrival_time"]
        burst = process["burst_time"]
        pid = process["pid"]

        # If the CPU is idle, update current time to arrival time
        if current_time < arrival:
            current_time = arrival

        start_time = current_time
        completion_time = start_time + burst
        turnaround_time = completion_time - arrival
        waiting_time = turnaround_time - burst

        result.append({
            "pid": pid,
            "arrival_time": arrival,
            "burst_time": burst,
            "start_time": start_time,
            "completion_time": completion_time,
            "turnaround_time": turnaround_time,
            "waiting_time": waiting_time
        })

        # Update current time for the next process
        current_time = completion_time

    # Calculate average waiting time and turnaround time
    avg_waiting_time = sum(p["waiting_time"] for p in result) / len(result)
    avg_turnaround_time = sum(p["turnaround_time"] for p in result) / len(result)

    return {
        "algorithm": "FCFS",
        "results": result,
        "average_waiting_time": avg_waiting_time,
        "average_turnaround_time": avg_turnaround_time
    }
