import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // TODO: 토큰에서 사용자 정보 복원
    const token = localStorage.getItem('token')
    if (token) {
      // TODO: API 호출로 사용자 정보 가져오기
      // 임시로 로컬 스토리지에서 사용자 정보 가져오기
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    }
  }, [])

  const login = async (email, password) => {
    // TODO: 실제 API 호출
    // 임시로 로컬 스토리지에 저장
    const mockUser = {
      id: '1',
      email,
      name: '사용자',
    }
    localStorage.setItem('token', 'mock-token')
    localStorage.setItem('user', JSON.stringify(mockUser))
    setUser(mockUser)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

