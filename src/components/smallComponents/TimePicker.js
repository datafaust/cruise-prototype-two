import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
 
const TimePickerView=(props)=>{
  const [value, onChange] = useState('10:00');
  const _setTime = (x) =>{
      onChange(x)
props.handleTimer(x)
  }
  
 
  return (
    <div>
      <TimePicker
        onChange={(x)=>_setTime(x)}
        value={value}
        format = "h a"
      />
    </div>
  );
}

export default TimePickerView