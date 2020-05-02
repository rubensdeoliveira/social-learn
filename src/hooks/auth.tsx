import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import api from '../services/api'
import { AUTH_BASE_URL, API_KEY } from '../env'

interface AuthState {
  token: string
  user: Object
}

interface SingInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: Object
  loading: boolean
  signIn(credentials: SingInCredentials): Promise<void>
  signOut(): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ])

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) })
      }

      setLoading(false)
    }

    loadStorageData()
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await axios.post(
      `${AUTH_BASE_URL}/verifyPassword?key=${API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      },
    )

    if (response.data.localId) {
      const responseUser = await api.get(`users/${response.data.localId}.json`)

      const user = { email, ...responseUser.data }
      const token = 'mudeissodepois'

      await AsyncStorage.multiSet([
        ['@GoBarber:token', token],
        ['@GoBarber:user', JSON.stringify(user)],
      ])

      setData({ token, user })
    }
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user'])

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}

export default AuthContext
