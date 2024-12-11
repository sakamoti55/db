import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      studentNumber
    };
    fetch('http://localhost:8080/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Failed to create student');
      }
    })
    .then(json => {
      setMessage(`登録成功: ID=${json.id}, Name=${json.name}, Number=${json.studentNumber}`);
      setName('');
      setStudentNumber('');
    })
    .catch(err => {
      console.error(err);
      setMessage('登録に失敗しました');
    });
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>生徒登録フォーム</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>生徒名: </label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)}
            required 
          />
        </div>
        <div>
          <label>生徒番号: </label>
          <input 
            type="text" 
            value={studentNumber} 
            onChange={e => setStudentNumber(e.target.value)}
            required 
          />
        </div>
        <button type="submit">登録</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
