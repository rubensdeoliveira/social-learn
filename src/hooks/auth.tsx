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
import { AUTH_BASE_URL, API_KEY } from '../env.js'

interface AuthState {
  token: string
  user: Object
}

interface SingInCredentials {
  email: string
  password: string
}

interface AnswerState {
  idQuestion: string
  correct: boolean
}

interface UserAnswersState {
  userAnswers: AnswerState[]
}

interface AuthContextData {
  userAnswers: UserAnswersState
  user: Object
  loading: boolean
  signIn(credentials: SingInCredentials): Promise<void>
  setUserAnswersValue(userAnswersValue: UserAnswersState): void
  signOut(): void
  token: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState)
  const [loading, setLoading] = useState(true)
  const [userAnswers, setUserAnswers] = useState<UserAnswersState[]>([])

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user, userAnswersFromAsync] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
        '@GoBarber:useranswers',
      ])

      if (token[1] && user[1] && userAnswersFromAsync[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) })
        setUserAnswers(JSON.parse(userAnswersFromAsync[1]))
      }

      setLoading(false)
    }

    loadStorageData()
  }, [])

  const setUserAnswersValue = useCallback(async (userAnswersValue) => {
    setUserAnswers(userAnswersValue)
    await AsyncStorage.setItem(
      '@GoBarber:useranswers',
      JSON.stringify(userAnswersValue),
    )
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

      const user = {
        email,
        ...responseUser.data,
        id: response.data.localId,
      }
      const token = response.data.idToken
      let userAnswersData = responseUser.data.userAnswers

      if (userAnswersData == null) {
        userAnswersData = []
      }

      await AsyncStorage.multiSet([
        ['@GoBarber:token', token],
        ['@GoBarber:user', JSON.stringify(user)],
        ['@GoBarber:useranswers', JSON.stringify(userAnswersData)],
      ])

      setData({ token, user })
      setUserAnswers(userAnswersData)
    }
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user'])

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        userAnswers,
        user: data.user,
        token: data.token,
        loading,
        signIn,
        signOut,
        setUserAnswersValue,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
