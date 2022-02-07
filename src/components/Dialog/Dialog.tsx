import React, { FC, useState } from 'react';
import InputField from '../InputField.tsx/InputField';
import { Modal, Button } from 'antd';
import { Itask } from '../../modules/modules';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask } from '../../features/taskSlice';


interface IDialogProps {
    task: Itask
};

const Dialog: FC<IDialogProps> = ({task}) => {
    const [IsVisible,setIsVisible] = useState<boolean>(false);
    const [editableTask,seteditableTask] = useState<string>(task.task);
    const dispatch = useDispatch();
    const handleCancel = () => {
        setIsVisible(false);
    };
    
    const onClickEdit = () => {
        dispatch(editTask({
            task:editableTask,
            id:task.id
        }))
    }
    const handleOpenDialog = () => {
        setIsVisible(true);
    }

    return ( 
        <>
            <Button type='primary' onClick={handleOpenDialog} style={{padding:'2px 5px', margin:'5px', borderRadius:'3px', width:'50px'}} >
                EDIT
            </Button>
            <Modal title="Edit Task" visible={IsVisible} onCancel={handleCancel} footer={[]} >
                <div style={{padding:'50px'}} >
                   <InputField
                        task={editableTask}
                        settask={seteditableTask}
                        onClickSubmit={onClickEdit}
                        placeholder={'Edit task ...'}
                        btnName='EDIT'
                    />
                </div>
            </Modal>
        </>
    );
};

export default Dialog;