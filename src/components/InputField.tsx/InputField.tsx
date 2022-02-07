import React, { FC } from 'react';
import { Button } from 'antd';


interface IInputFieldProps {
    task: string;
    settask: React.Dispatch<React.SetStateAction<string>>;
    onClickSubmit: () => void;
    placeholder:string;
    btnName: string
};

const InputField: FC<IInputFieldProps> = ({ task, settask, onClickSubmit, placeholder, btnName }) => {
    return ( 
        <div className='input_form' style={{display:'flex', justifyContent:'center',alignItems:'center'}} >
                <input
                    style={{ padding:'8px',margin:'5px', fontSize:'20px', borderRadius:'10px' }}
                    value={task}
                    onChange={(e)=>settask(e.target.value)}
                    placeholder={placeholder}
                    type='text'
                    width={'100%'}
                />
            
            <Button type='primary' onClick={onClickSubmit} style={{margin:'5px', borderRadius:'10px',height:'50px'}} >
                {btnName}
            </Button>
        </div>
    );
};

export default InputField;