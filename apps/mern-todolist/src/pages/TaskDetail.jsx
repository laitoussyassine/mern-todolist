import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import handleStatusToggle from "../utilities/handleStatusToggle";
import Loader from '../components/Loader';
import StatusButton from '../components/StatusButton';


function TaskDetail() {

  const { id } = useParams();

  const [ task, setTask ] = useState('');
  const [ selectedStatus, setSelectedStatus ] = useState('')
  const [ loading, setLoading ] = useState(true);

  const getTask = useCallback(async () => {
    try {
      const task = await axios.get(`http://localhost:8000/api/tasks/${id}`);
      setTask(task.data)
      setSelectedStatus(task.data.completed ? "Completed" : "Not Completed")
    } catch (error) {
      console.error('Error fetching task:', error);
    } finally {
      setLoading(false)
    }
  }, []);


  useEffect(() => {
    getTask()
  }, [getTask]);

  const priorityColor = {
    low: "bg-lime-600",
    high: "bg-red-700",
    middle: "bg-amber-500"
   
  }

  if (loading) {
    return <Loader />
  }

  const statusClassColor = task.completed  ?  "bg-lime-600" : "bg-cyan-700" ;

  return (
    <div className='overflow-x-auto w-9/12 m-auto bg-gray-500 rounded-lg mt-10 py-10'>
      <div className='bg-stone-900 w-11/12 m-auto rounded-lg py-10 px-10'>
        <h1 className='text-white'>{task.title}</h1>
        <p className='mt-10 text-white opacity-80'>{task.description}</p>
        <div className='mt-10 flex gap-5'>
          <StatusButton text={task.priority} color={priorityColor[task.priority]} />
          <StatusButton text={selectedStatus} color={`${statusClassColor}`} onClick={() => handleStatusToggle(selectedStatus, id, setTask, setSelectedStatus)} />
        </div>
        <p className='text-white mt-10'>to be finshed by: {task.deadline.split('T')[0]}</p>
      </div>
    </div>
  )
}

export default TaskDetail;
