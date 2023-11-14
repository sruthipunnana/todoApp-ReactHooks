import './App.css';
import { useState } from 'react';

function App() {
  const data= localStorage.getItem('lists')? JSON.parse(localStorage.getItem('lists')):[]
  const [newTask,setNewTask] = useState('')
  const [search,setSearch] = useState('')
  const [list,setList]= useState(data)


 const addTask=()=>{
    localStorage.setItem('lists', JSON.stringify([...list, newTask]))
    setList([...list, newTask])
    setNewTask('')
}


  const updateTask = (e,i) => {
    const updatedList = [...list]; // Create a copy of the original list
    updatedList.splice(i,1,e.target.value)// Update the task at the specified index
    localStorage.setItem('lists', JSON.stringify(updatedList))
    setList(updatedList); // Set the updated list
  } 

  const deleteTodo=(i)=>{
    const newList= [...list]
    newList.splice(i,1)
    localStorage.setItem('lists', JSON.stringify(newList))
    setList(newList) 
  }

  const enterKey=(e)=>{
    if (e.key==='Enter'){
      addTask()
    }
  }

  return (
    <div className="App">
      <div className='search'>
        <input type='search' placeholder='Search Task🔍' onChange={(e)=>setSearch(e.target.value)} value={search}/>
      </div>
      <h1 className='heading'>Todo List🎆 </h1>
      <div className='inputs'>
      <input type='text' value={newTask} onChange={(e)=>setNewTask(e.target.value)} onKeyDown={enterKey}/>
      <button className='btn' onClick={addTask}>Add Task🖊️</button>
      </div>
      <div className='container'>
        {data.map((each, i)=>{
          if (each.toLowerCase().includes(search.toLowerCase())){
            return (
              <div className='list' key={i}>
                <input type='text' value={each} onChange={(e) => updateTask(e, i)}/>
                <span className='icon' onClick={()=>deleteTodo(i)}>❌</span>
              </div>
            )
          } 
          return null; 
        })} 
      </div>

    </div>
  );
}

export default App;
