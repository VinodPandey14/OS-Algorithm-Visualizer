# 🧠 OS Algorithm Visualizer

Welcome to the **OS Algorithm Visualizer** – a full-stack project built by **Vinod Pandey** to simulate, visualize, and understand core operating system algorithms through an interactive user interface and dynamic backend logic.

---

## 📌 Project Overview

This project helps students and developers **learn and visualize** key Operating System concepts, including:

- 🧠 Process Scheduling Algorithms  
- 💽 Disk Scheduling Algorithms  
- 📦 Memory Management Techniques

All visualized with Gantt charts, disk movements, memory blocks, and detailed theoretical explanations.

---

## 🚀 Live Features

✅ Select any algorithm type and variation  
✅ Enter custom or default input dynamically  
✅ View visual outputs: timelines, disks, memory  
✅ See performance metrics (waiting time, seek count, fragmentation)  
✅ Read intuitive theory with emojis and bold formatting  
✅ Smart backend logic with modular Python implementation  
✅ Works fully offline (no database or API dependency)

---

## 🧩 Algorithms Implemented

### 🧠 Process Scheduling
- FCFS (First Come First Serve)
- SJF (Preemptive & Non-Preemptive)
- Priority Scheduling (Preemptive & Non-Preemptive)
- Round Robin

### 💽 Disk Scheduling
- FCFS
- SSTF (Shortest Seek Time First)
- SCAN (Elevator Algorithm)
- C-SCAN
- LOOK

### 📦 Memory Management
- First Fit
- Best Fit
- Worst Fit

---

## 🖼️ Visualizations

- **Gantt Charts** for process execution  
- **Disk Seek Graph** for head movement  
- **Memory Blocks View** with color-coded allocation  
- **Live Timeline Simulator** for process execution  
- **Theory Summary** dynamically loaded from JSON

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Axios (API)
- Font Awesome Icons
- Plain CSS
- JSON-based dynamic theory system

### Backend
- Python 3
- Flask (REST API)
- Modular algorithm files
- Stateless logic (no DB used)

---

## 🧭 Project Structure

``` 
os-algorithm-visualizer/
├── frontend/
│ ├── public/
│ │ └── algorithm_theory.json # Theory data
│ ├── src/
│ │ ├── components/ # All visual + logic components
│ │ ├── pages/ # Home, Input, Result views
│ │ └── style/ # Custom CSS
├── backend/
│ ├── algorithms/ # process/, disk/, memory/
│ ├── app.py # Main Flask server
│ ├── util.py # Shared helpers
│ └── requirements.txt # Python dependencies
```

---


---

## 💻 How to Run

### 🔧 Backend (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
Runs on: http://localhost:5000

cd frontend
npm install
npm run dev
Runs on: http://localhost:5173
```

🌐 API Usage
POST /visualize