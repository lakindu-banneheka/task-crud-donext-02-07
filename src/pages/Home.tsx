import React, { FC, useEffect, useState } from 'react';
import InputField from '../components/InputField.tsx/InputField';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Itask } from '../modules/modules';
import { addTask, deleteTask, getTaskList } from '../features/taskSlice';
import Dialog from '../components/Dialog/Dialog';
import { Button } from 'antd';


interface IHomeProps {
    
};

const Home: FC<IHomeProps> = () => {
    const taskListSelector = useAppSelector(state => state.tasks.taskList);
    const dispatch = useAppDispatch();
    const [task,settask] = useState<string>('');
    const [taskList,settaskList] = useState<Itask[]>([]);
    
    
    const onClickSubmit = () => {
        dispatch(addTask(task));
        settask('');
    };

    useEffect(()=>{
        settaskList(taskListSelector);
    },[taskListSelector]);

    useEffect(()=>{
        dispatch(getTaskList());
    },[dispatch]);

    const onClickDelete = (id: string) => {
        dispatch(deleteTask(id));
    };

    return ( 
        <div >
            <div className='input Field' style={{padding:'50px', background:'#cccccc'}}  >
                <InputField 
                    task={task}
                    settask={settask}
                    onClickSubmit={onClickSubmit}
                    placeholder={'add a task ...'}                
                    btnName='ADD'
                />
            </div>
            <div className='task_container' style={{ padding:'20px', width:'100%' }} >
                <div style={{ display:'inline-block'}} >
                        { taskList.map((task,i) => {
                            return (
                                <div key={i} 
                                        style={{display:'flex',justifyContent:'space-between',margin:'20px', width:'100%', background:'#cfcfcf', 
                                                padding:'10px 20px',alignItems:'center',borderRadius:'10px', height:'50px'
                                    }} >
                                    <div>
                                        <h3>{task.task}</h3>
                                    </div>
                                    <div >
                                        <Dialog task={task} />
                                        <Button type='primary' danger onClick={()=>onClickDelete(task._id)} style={{padding:'2px 5px', margin:'5px', borderRadius:'5px', width:'70px'}}>
                                            DELETE
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Home;