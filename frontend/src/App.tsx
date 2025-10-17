import React from "react";
import { Layout } from "antd";
import TaskForm from "./components/TaskForm";
import TaskTable from "./components/TaskTable";

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ color: "white", fontSize: 20 }}>Kaiburr Task Manager</Header>
      <Content style={{ padding: 24 }}>
        <TaskTable />
        <TaskForm refresh={() => window.location.reload()} />
      </Content>
    </Layout>
  );
};

export default App;
