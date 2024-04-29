import TaskItem from "@tiptap/extension-task-item";
import styles from "./scooter-taskitem.module.scss";
export function ScooterTaskitem(props) {
  return TaskItem.configure({
    nested: true,
  });
}
// export default ScooterTaskitem;
