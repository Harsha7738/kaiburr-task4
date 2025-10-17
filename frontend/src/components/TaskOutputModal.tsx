import React from "react";
import { Modal } from "antd";

const TaskOutputModal: React.FC<{ visible: boolean; output: string; onClose: () => void }> = ({ visible, output, onClose }) => {
  return (
    <Modal visible={visible} onCancel={onClose} footer={null}>
      <pre>{output}</pre>
    </Modal>
  );
};

export default TaskOutputModal;
