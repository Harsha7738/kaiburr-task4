package com.kaiburr.controller;

import com.kaiburr.model.*;
import com.kaiburr.repo.TaskRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping("/tasks")
@CrossOrigin
public class TaskController {

    @Autowired
    private TaskRepository repo;

    // GET all tasks
    @GetMapping
    public List<Task> getAll() {
        return repo.findAll();
    }

    // GET task by ID
    @GetMapping(params = "id")
    public Task getById(@RequestParam String id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    // POST a new task
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return repo.save(task);
    }

    // PUT mapping for updating an existing task
    @PutMapping
    public Task updateTask(@RequestBody Task task) {
        return repo.save(task);
    }

    // DELETE a task
    @DeleteMapping
    public String delete(@RequestParam String id) {
        repo.deleteById(id);
        return "Deleted: " + id;
    }

    // Search tasks by name
    @GetMapping("/search")
    public List<Task> search(@RequestParam String name) {
        return repo.findByNameContainingIgnoreCase(name);
    }

    // Execute a task command
    @PutMapping("/{id}/executions")
    public Map<String, Object> execute(@PathVariable String id) {
        Optional<Task> optional = repo.findById(id);
        if (optional.isEmpty()) return Map.of("error", "Task not found");

        Task task = optional.get();
        String cmd = task.getCommand();
        if (cmd == null || cmd.isBlank()) return Map.of("error", "No command found");

        try {
            Instant start = Instant.now();
            ProcessBuilder pb = new ProcessBuilder("bash", "-c", cmd);
            Process process = pb.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null)
                output.append(line).append("\n");
            process.waitFor();
            Instant end = Instant.now();

            TaskExecution exec = new TaskExecution();
            exec.setStartTime(start);
            exec.setEndTime(end);
            exec.setOutput(output.toString());

            List<TaskExecution> execs = task.getTaskExecutions();
            if (execs == null) execs = new ArrayList<>();
            execs.add(exec);
            task.setTaskExecutions(execs);

            repo.save(task);
            return Map.of(
                "output", output.toString(),
                "startTime", start,
                "endTime", end
            );
        } catch (Exception e) {
            return Map.of("error", e.getMessage());
        }
    }
}
