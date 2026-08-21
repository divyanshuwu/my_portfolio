/**
 * NEXUS-OS Portfolio Configuration & Database
 * Central data store for portfolio profile, skills, and interactive modules.
 */
const PORTFOLIO_CONFIG = {
  profile: {
    name: "Divyansh",
    handle: "divyanshuwu",
    codename: "VIDI-VICI",
    title: "B.Tech IT (3rd Year) & Systems / Backend Engineer",
    shortBio: "Building high-throughput FastAPI microservices, concurrent Java systems, and database-driven applications.",
    extendedBio: `I am a 3rd-year B.Tech Information Technology student with a passion for backend architectures, systems engineering, cybersecurity, and open-source contribution. I have strong command over Java, Python, MySQL, FastAPI, REST APIs, and Git & GitHub, and I am continuously learning and building scalable software.`,
    education: {
      degree: "Bachelor of Technology in Information Technology",
      year: "3rd Year (Class of 2028)",
      status: "Actively seeking Software Engineering, Backend & CyberSecurity Internships",
      cgpa: "7.0 / 10.0",
      coursework: [
        "Data Structures & Algorithms",
        "Database Management Systems (DBMS)",
        "Operating Systems & Concurrency",
        "Object Oriented Programming (Java/Python)",
        "Computer Networks & Protocols",
        "Web Engineering & REST APIs"
      ]
    },
    location: "Gorakhpur / India (UTC +05:30)",
    statusBeacon: "SYSTEM ACTIVE // READY FOR INTERNSHIP DEPLOYMENT",
    social: {
      github: "https://github.com/divyanshuwu",
      linkedin: "https://www.linkedin.com/in/divyansh-divyansh-48823b331",
      email: "divyanshkumar458@gmail.com"
    },
    metrics: [
      { label: "LeetCode Solved", value: "0", icon: "code" },
      { label: "GitHub Profile", value: "@divyanshuwu", icon: "git-branch" },
      { label: "Core Technologies", value: "8+", icon: "zap" },
      { label: "Academic CGPA", value: "7.0", icon: "award" }
    ]
  },

  skills: {
    categories: [
      {
        id: "backend",
        name: "Backend & Systems",
        icon: "server",
        description: "Asynchronous microservices, RESTful API contract design, and backend systems in Java & Python.",
        items: [
          { name: "FastAPI", level: 90, status: "Advanced", exp: "1+ Years", tag: "Async Microservices" },
          { name: "Python", level: 88, status: "Advanced", exp: "1+ Years", tag: "Data, AsyncIO & APIs, OOP" },
          { name: "Java", level: 85, status: "Advanced", exp: "1+ Years", tag: "OOP, Collections, Multithreading" },
          { name: "REST APIs", level: 92, status: "Expert", exp: "1+ Years", tag: "OpenAPI, JSON, HTTP Protocols" }
        ]
      },
      {
        id: "database",
        name: "Database & Storage",
        icon: "database",
        description: "Relational modeling, schema indexing, complex queries, and ACID compliance.",
        items: [
          { name: "SQL (MySQL)", level: 86, status: "Advanced", exp: "1+ Years", tag: "Complex Queries & Joins" },
          { name: "Database Design & ERD", level: 84, status: "Advanced", exp: "1+ Years", tag: "Normalization & Schema Design" },
          { name: "SQLAlchemy & ORM", level: 82, status: "Intermediate", exp: "1+ Years", tag: "Connection Pooling & Models" }
        ]
      },
      {
        id: "frontend",
        name: "Web & Frontend",
        icon: "layout",
        description: "Modern responsive web applications, DOM manipulation, async fetch, and clean styling.",
        items: [
          { name: "JavaScript (ES6+)", level: 85, status: "Advanced", exp: "2+ Years", tag: "Async/Await, DOM, Events" },
          { name: "HTML5 Semantic", level: 92, status: "Expert", exp: "3+ Years", tag: "Accessibility, Structure" },
          { name: "CSS3 & Modern Layouts", level: 88, status: "Advanced", exp: "3+ Years", tag: "CSS Grid, Flexbox, Responsive" }
        ]
      },
      {
        id: "tools",
        name: "DevOps & Engineering Tools",
        icon: "terminal",
        description: "Version control workflows, repository management, and automated API testing tools.",
        items: [
          { name: "Git & GitHub", level: 88, status: "Advanced", exp: "2.5+ Years", tag: "Branching, Commits, PRs" },
          { name: "Postman & Swagger", level: 90, status: "Advanced", exp: "2+ Years", tag: "Contract Testing & Docs" },
          { name: "Linux / Bash Basics", level: 80, status: "Intermediate", exp: "1.5+ Years", tag: "CLI & Scripts" }
        ]
      }
    ],

    codeSnippets: {
      fastapi: {
        title: "FastAPI Async Microservice Endpoint",
        lang: "Python / FastAPI",
        code: `from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import List
import asyncio

app = FastAPI(title="Nexus Core API", version="3.1.0")

class TelemetryPayload(BaseModel):
    sensor_id: str
    status: str

@app.get("/api/v1/telemetry", response_model=dict, status_code=status.HTTP_200_OK)
async def get_system_telemetry():
    """Async non-blocking retrieval of cluster metrics"""
    await asyncio.sleep(0.04) # simulated non-blocking I/O
    return {
        "status": "ONLINE",
        "developer": "Divyansh",
        "uptime": "99.99%",
        "active_nodes": 4
    }

@app.post("/api/v1/ingest", status_code=status.HTTP_201_CREATED)
async def ingest_telemetry(payload: TelemetryPayload):
    return {"message": "Data stream synchronized", "id": payload.sensor_id}`
      },
      python: {
        title: "Python Asynchronous Worker & Pipeline",
        lang: "Python",
        code: `import asyncio
import time
from dataclasses import dataclass

@dataclass
class Packet:
    id: int
    payload: str
    latency_ms: float

async def process_stream(queue: asyncio.Queue):
    while True:
        packet: Packet = await queue.get()
        packet.latency_ms = (time.perf_counter() % 1) * 1000
        print(f"[WORKER] Transmuted Packet #{packet.id} in {packet.latency_ms:.2f}ms")
        queue.task_done()

async def main():
    stream_queue = asyncio.Queue(maxsize=100)
    workers = [asyncio.create_task(process_stream(stream_queue)) for _ in range(4)]
    for i in range(10):
        await stream_queue.put(Packet(i, "QUANTUM_DATA", 0.0))
    await stream_queue.join()
    for w in workers: w.cancel()`
      },
      java: {
        title: "Java Multithreaded Task Dispatcher",
        lang: "Java",
        code: `import java.util.concurrent.*;
import java.util.List;
import java.util.stream.Collectors;

public class NexusEngine {
    private final ExecutorService threadPool = Executors.newFixedThreadPool(8);

    public record TaskNode(String id, int priority) {}

    public CompletableFuture<List<String>> dispatchBatch(List<TaskNode> tasks) {
        List<CompletableFuture<String>> futures = tasks.stream()
            .map(task -> CompletableFuture.supplyAsync(() -> {
                return String.format("[NODE-%s] Processed with priority %d", 
                    task.id(), task.priority());
            }, threadPool))
            .toList();

        return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
            .thenApply(v -> futures.stream()
                .map(CompletableFuture::join)
                .collect(Collectors.toList()));
    }
}`
      },
      sql: {
        title: "Advanced SQL Aggregation & Join Query",
        lang: "SQL (PostgreSQL / MySQL)",
        code: `-- Relational metrics query with aggregation and indexing
SELECT 
    d.department_name,
    COUNT(e.id) AS total_engineers,
    AVG(e.performance_score) AS avg_score
FROM departments d
LEFT JOIN engineers e ON d.id = e.department_id AND e.is_active = TRUE
GROUP BY d.id, d.department_name
HAVING COUNT(e.id) > 0
ORDER BY avg_score DESC;`
      }
    }
  },

  aiKnowledge: {
    name: "NEXUS-AI",
    version: "v4.2.0-Quantum",
    greeting: "Greetings, operative! I am NEXUS-AI, the autonomous assistant for Divyansh's portfolio. Ask me anything regarding Divyansh's technical skills, B.Tech coursework, or internship availability!",
    quickPrompts: [
      "What are Divyansh's core skills?",
      "What is Divyansh's academic background?",
      "Is Divyansh available for internships?",
      "How can I contact Divyansh?",
      "What is Divyansh's GitHub profile?"
    ],
    responses: {
      skills: "Divyansh specializes in **Java, Python, JavaScript, SQL, FastAPI, REST APIs, HTML5, CSS3, Cybersecurity, and Git & GitHub**. Divyansh is skilled in asynchronous backend development, database design, concurrent Java systems, and web technologies.",
      projects: "Divyansh actively builds backend systems, microservices, and database solutions. Check out Divyansh's GitHub profile at **https://github.com/divyanshuwu** for active repositories and code commits!",
      internship: "Yes! Divyansh is a **3rd-year B.Tech Information Technology student** (Class of 2028) with a **7.0 CGPA**, actively seeking Software Engineering, Backend Developer, and Cybersecurity Internships.",
      academics: "Divyansh is currently in the **3rd year of B.Tech in Information Technology** (Class of 2028) maintaining a **7.0 CGPA**. Core coursework includes Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, and Object-Oriented Software Design.",
      fastapi: "Divyansh utilizes **FastAPI** for crafting asynchronous REST microservices with Pydantic validation, OpenAPI documentation, and high-performance async routing.",
      java: "In Java, Divyansh focuses on **Core OOP principles, Collections, Multithreading, Concurrency (ExecutorService, CompletableFuture)**, and building robust, maintainable backend applications.",
      sql: "Divyansh has strong skills in **Relational Databases (PostgreSQL, MySQL)**, schema normalization (3NF/BCNF), complex SQL joins, indexing, and database design.",
      security: "Divyansh is a **cybersecurity enthusiast** with experience in network socket analysis, HTTP security header audits, vulnerability scanning, and secure API architecture.",
      contact: "You can reach Divyansh via:\n- **Email**: divyanshkumar458@gmail.com\n- **LinkedIn**: https://www.linkedin.com/in/divyansh-divyansh-48823b331\n- **GitHub**: https://github.com/divyanshuwu\n- Or use the interactive **Quantum Contact Uplink** on this website!"
    }
  }
};
