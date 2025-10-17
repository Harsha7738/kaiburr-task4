import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import { getTasks, deleteTask, runTask, searchTask } from "../services/taskService";

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [output, setOutput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleRun = async (id: string) => {
    const res = await runTask(id);
    setOutput(res.data.output || res.data.error);
    setModalVisible(true);
  };

  const handleSearch = async () => {
    if (search) {
      const res = await searchTask(search);
      setTasks(res.data);
    } else {
      fetchTasks();
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Owner", dataIndex: "owner", key: "owner" },
    { title: "Command", dataIndex: "command", key: "command" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <>
          <Button onClick={() => handleRun(record.id)} style={{ marginRight: 8 }}>Run</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      )
    }
  ];

  return (
    <>
      <Input.Search
        placeholder="Search by name"
        value={search}
        onChange={e => setSearch(e.target.value)}
        onSearch={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <Table dataSource={tasks} columns={columns} rowKey="id" />
      <Modal visible={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
        <pre>{output}</pre>
      </Modal>
    </>
  );
};

export default TaskTable;
