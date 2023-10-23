'use client';

import { Modal, Form, Input, Button, Typography } from "antd";
import { useAppSelector } from "@/redux/store/hook";
import CloseIcon from '../../../public/assets/icon-cross.svg';
import { btnStyles, columnsIput, inputStyles } from "./boardModalStyles";

type BMProps = {
    isBoardModal: boolean
    setIsBoardModal: () => void
}

const BoardModal = ({isBoardModal, setIsBoardModal}: BMProps) => {
    const initialValue = {name: '', columns: [{ name: 'Todo' }, { name: 'Doing'}]}
    const { isDark } = useAppSelector(state => state.themeSlice.currentTheme);

    const onFinish = (values: any) => {
        console.log('Success', values)
        // const board = [{name: 'Roadmap', columns: [{ name: 'Now', tasks: [] }]}]
    }

    return (
        <Modal title={'Add New Board'} 
            open={isBoardModal} 
            onCancel={setIsBoardModal} 
            closeIcon={null} centered
            maskClosable={true} footer={null}
            style={{padding: '30px 0px'}}
        >
            <Form onFinish={onFinish}
                initialValues={initialValue}
                layout="vertical" 
                name="new-board"
                colon={false} autoComplete='off'
            >
                <Form.Item label={'Board Name'} name={'name'}>
                    <Input placeholder="eg Web Design" 
                        className="board-name" size="large" 
                        style={{...inputStyles, backgroundColor: !isDark ? '#FFF' : '#2B2C37', marginBottom: 24}}
                    />
                </Form.Item>

                <Typography.Text>BoardColumns</Typography.Text>
                <Form.List name={'columns'}>
                    {(fields, { add, remove}) => (
                        <>
                            {fields.map((field, index) => (
                                <div key={field.key}
                                    className="flex-row between" 
                                    style={columnsIput}
                                >
                                    <Form.Item name={[field.name, 'name']} style={{width: '95%', margin: '0px 0px'}}>
                                        <Input size="large" style={{...inputStyles, backgroundColor: !isDark ? '#FFF' : '#2B2C37'}}/>
                                    </Form.Item>

                                    <CloseIcon onClick={() => remove(field.name)} style={{cursor: 'pointer'}} />
                                </div>
                            ))}
                            <Button 
                                onClick={() => add()}
                                type="primary" 
                                style={{...btnStyles, backgroundColor: !isDark ? 'rgba(99, 95, 199, 0.10)' : '#FFF', color: '#635FC7'}}
                            >
                                + Add New Column
                            </Button>
                        </>
                    )}
                </Form.List>
            
                <Form.Item>
                    <Button htmlType="submit" type="primary" style={{...btnStyles, marginTop: 24}}>
                        Create New Board
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default  BoardModal;