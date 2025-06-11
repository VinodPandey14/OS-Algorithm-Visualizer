# Importing process scheduling algorithms
from algorithms.process.fcfs import fcfs
from algorithms.process.sjf_np import sjf_non_preemptive
from algorithms.process.sjf_p import sjf_preemptive
from algorithms.process.round_robin import round_robin
from algorithms.process.priority import priority_preemptive

# Importing disk scheduling algorithms
from algorithms.disk.fcfs import disk_fcfs
from algorithms.disk.scan import scan
from algorithms.disk.cscan import cscan
from algorithms.disk.look import look
from algorithms.disk.sstf import sstf

# Importing memory management algorithms
from algorithms.memory.first_fit import first_fit
from algorithms.memory.worst_fit import worst_fit
from algorithms.memory.best_fit import best_fit

def get_algorithm_function(algo_type, algo, input_data, quantum=None):
    if algo_type == "process":
        if algo == "FCFS":
            return fcfs(input_data)
        elif algo == "SJF-NP":
            return sjf_non_preemptive(input_data)
        elif algo == "SJF-P":
            return sjf_preemptive(input_data)
        elif algo == "RR":
            return round_robin(input_data, quantum)
        elif algo == "Priority":
            return priority_preemptive(input_data)
    
    elif algo_type == "disk":
        if algo == "FCFS":
            return disk_fcfs(input_data)
        elif algo == "SCAN":
            return scan(input_data)
        elif algo == "C-SCAN":
            return cscan(input_data)
        elif algo == "LOOK":
            return look(input_data)
        elif algo == "SSTF":
            return sstf(input_data)
    
    elif algo_type == "memory":
        if algo == "First Fit":
            return first_fit(input_data)
        elif algo == "Worst Fit":
            return worst_fit(input_data)
        elif algo == "Best Fit":
            return best_fit(input_data)
    
    return {"error": f"Algorithm '{algo}' for '{algo_type}' type not implemented"}
