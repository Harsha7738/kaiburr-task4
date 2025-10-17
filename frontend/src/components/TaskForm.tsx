import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { createOrUpdateTask } from "../services/taskService";

const TaskForm: React.FC<{ refresh: () => void }> = ({ refresh }) => {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [command, setCommand] = useState("");

  const handleSubmit = async () => {
    await createOrUpdateTask({ name, owner, command });
    setName(""); setOwner(""); setCommand("");
    refresh();
  };

  return (
    <Form layout="inline" onFinish={handleSubmit} style={{ marginBottom: 16 }}>
      <Form.Item>
        <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      </Form.Item>
      <Form.Item>
        <Input placeholder="Owner" value={owner} onChange={e => setOwner(e.target.value)} />
      </Form.Item>
      <Form.Item>
        <Input placeholder="Command" value={command} onChange={e => setCommand(e.target.value)} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Add Task</Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
