// ProfileContext.js
import React, { createContext, useState, useContext } from 'react';

// 创建上下文
const ProfileContext = createContext(null);

// 创建一个自定义钩子以方便地访问上下文
export const useProfile = () => useContext(ProfileContext);

// 创建一个 Provider 组件
export const ProfileProvider = ({ children }) => {
    const [backgroundUri, setBackgroundUri] = useState(require('../assets/BcakGround.jpg'));
    const [headUri, setHeadUri] = useState(require('../assets/ProfileHead.jpg'));

    return (
        <ProfileContext.Provider value={{ backgroundUri, setBackgroundUri, headUri, setHeadUri }}>
            {children}
        </ProfileContext.Provider>
    );
};
