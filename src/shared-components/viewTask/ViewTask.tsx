import { Modal, Form } from "antd";
import { useAppSelector } from "@/redux/store/hook"

type VTProps = {
    index: number
}

const ViewTask = () => {
    const { task } = useAppSelector(state => state.taskSlice);
    console.log(task, 'viewtask')

    return(
        <p>View Task </p>
    )
}

export default ViewTask;