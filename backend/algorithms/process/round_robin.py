from collections import deque

def round_robin(input_data, quantum):
    processes = []
    for i in range(len(input_data["arrival"])):
        processes.append({
            "pid": i + 1,
            "arrival_time": input_data["arrival"][i],
            "burst_time": input_data["burst"][i],
            "remaining_time": input_data["burst"][i],
            "start_time": -1,
            "completion_time": 0
        })

    time = 0
    queue = deque()
    visited = [False] * len(processes)
    completed = 0
    result = []
    gantt_segments = []

    while completed < len(processes):
        for i, p in enumerate(processes):
            if p["arrival_time"] <= time and not visited[i]:
                queue.append(i)
                visited[i] = True

        if not queue:
            time += 1
            continue

        index = queue.popleft()
        p = processes[index]

        if p["start_time"] == -1:
            p["start_time"] = time

        exec_time = min(quantum, p["remaining_time"])
        segment_start = time
        time += exec_time
        segment_end = time
        p["remaining_time"] -= exec_time

        gantt_segments.append({
            "pid": p["pid"],
            "start_time": segment_start,
            "completion_time": segment_end
        })

        for i, proc in enumerate(processes):
            if proc["arrival_time"] > segment_start and proc["arrival_time"] <= time and not visited[i]:
                queue.append(i)
                visited[i] = True

        if p["remaining_time"] == 0:
            p["completion_time"] = time
            tat = p["completion_time"] - p["arrival_time"]
            wt = tat - p["burst_time"]
            result.append({
                "pid": p["pid"],
                "arrival_time": p["arrival_time"],
                "burst_time": p["burst_time"],
                "start_time": p["start_time"],
                "completion_time": p["completion_time"],
                "turnaround_time": tat,
                "waiting_time": wt
            })
            completed += 1
        else:
            queue.append(index)

    avg_wt = sum(p["waiting_time"] for p in result) / len(result)
    avg_tat = sum(p["turnaround_time"] for p in result) / len(result)

    return {
        "algorithm": "Round Robin",
        "results": result,
        "average_waiting_time": avg_wt,
        "average_turnaround_time": avg_tat,
        "gantt": gantt_segments
    }
