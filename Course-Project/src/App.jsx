// App.jsx
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import { courses } from './Data'
import Course from './Course'
import './css/course.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <div class="course-main">
        {courses?.map((course) => (
          <Course key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default App
