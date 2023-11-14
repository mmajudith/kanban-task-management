import { Modal, Form } from "antd";
import { useAppSelector } from "@/redux/store/hook"
import { TasksType } from "@/types/types";

type VTProps = {
    task: TasksType
    index: number
}

const ViewTask = ({task, index}: VTProps) => {
    console.log(task, 'viewtask')
    console.log(index, 'viewtask index')

    return(
        <p>View Task </p>
    )
}

export default ViewTask;