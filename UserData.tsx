import React, { useEffect, useState, useRef } from 'react';

// 定义 props 类型
type UserDataProps = {
  userId: string;
};

// 定义用户数据结构类型（可根据实际 API 响应内容补充）
type User = {
  name: string;
  email: string;
};

const UserData: React.FC<UserDataProps> = ({ userId }) => {
  // state
  const [user, setUser] = useState<User | null>(null);
  const [seconds, setSeconds] = useState<number>(0);

  // 保存 intervalId 用于清理
  const intervalIdRef = useRef<number | undefined>(undefined);

  // 模拟 componentDidMount
  useEffect(() => {
    fetchUserData(); // 初次挂载时请求用户数据

    // 开始计时器
    intervalIdRef.current = window.setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // 模拟 componentWillUnmount
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []); // 仅在初次挂载时执行

  // 模拟 componentDidUpdate: 监听 userId 变化
  useEffect(() => {
    fetchUserData();
  }, [userId]);

  // 异步函数获取用户数据
  const fetchUserData = () => {
    fetch(`https://secret.url/user/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user data:', error));
  };

  return (
    <div>
      <h1>User Data Component</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <p>Timer: {seconds} seconds</p>
    </div>
  );
};

export default UserData;
