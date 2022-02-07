import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import InputField from '../InputField.tsx/InputField';
import { Modal, Button } from 'antd';
import { Itask } from '../../modules/modules';
import { useDispatch } from 'react-redux';
import { editTask } from '../../features/taskSlice';


interface IDialogProps {
    task: Itask
};

const Dialog: FC<IDialogProps> = ({task}) => {
    const [IsVisible,setIsVisible] = useState<boolean>(false);
    const [TaskValue,setTaskValue] = useState<string>('');
    const [editedTask,seteditedTask] = useState<Itask>(task);

    const dispatch = useDispatch();
    const handleCancel = () => {
        setIsVisible(false);
    };

    useLayoutEffect(()=>{
        setTaskValue(task.task);
    },[task.task]);
    
    useEffect(()=> {
        seteditedTask({
            task: TaskValue,
            _id: task._id
        })
    },[task,TaskValue]);

    const onClickEdit = () => {
        dispatch(editTask(editedTask));
        setIsVisible(false);
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
                        task={TaskValue}
                        settask={setTaskValue}
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