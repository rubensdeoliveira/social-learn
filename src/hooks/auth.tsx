import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import queryString from 'query-string'
import api from '../services/api'
import { AUTH_BASE_URL, API_KEY, REFRESH_TOKEN_URL } from '../env.js'

interface UserData {
  id: string
  birthday: string
  city: string
  college: string
  gender: string
  image: string
  isModerator: boolean
  name: string
  username: string
  userAnswers: UserAnswersState
  email: string
}

interface AuthState {
  refresh_token: string
  token: string
  user: UserData
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
  userAnswers?: Array<AnswerState>
}

interface AuthContextData {
  userAnswers: UserAnswersState
  user: UserData
  loading: boolean
  signIn(credentials: SingInCredentials): Promise<void>
  setUserAnswersValue(userAnswersValue: UserAnswersState): Promise<void>
  signOut(): void
  modifyUser(user: Object): Promise<void>
  token: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState)
  const [loading, setLoading] = useState(true)
  const [userAnswers, setUserAnswers] = useState<UserAnswersState>(
    [] as UserAnswersState,
  )

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [
        token,
        refreshtoken,
        user,
        userAnswersFromAsync,
      ] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:refreshtoken',
        '@GoBarber:user',
        '@GoBarber:useranswers',
      ])

      if (token[1] && refreshtoken[1] && user[1] && userAnswersFromAsync[1]) {
        try {
          const response = await axios.post(
            `${REFRESH_TOKEN_URL}/token?key=${API_KEY}`,
            queryString.stringify({
              grant_type: 'refresh_token',
              refresh_token: refreshtoken[1],
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          )

          if (response.data.id_token) {
            setData({
              token: response.data.id_token,
              refresh_token: refreshtoken[1],
              user: JSON.parse(user[1]),
            })
            setUserAnswers(JSON.parse(userAnswersFromAsync[1]))
          }
        } catch {}
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

  const modifyUser = useCallback(
    async (user) => {
      await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user))

      setData({ user, token: data.token, refresh_token: data.refresh_token })
    },
    [data],
  )

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
      const refresh_token = response.data.refreshToken
      let userAnswersData = responseUser.data.userAnswers

      if (userAnswersData == null) {
        userAnswersData = []
      }

      await AsyncStorage.multiSet([
        ['@GoBarber:token', token],
        ['@GoBarber:refreshtoken', refresh_token],
        ['@GoBarber:user', JSON.stringify(user)],
        ['@GoBarber:useranswers', JSON.stringify(userAnswersData)],
      ])

      setData({ token, refresh_token, user })
      setUserAnswers(userAnswersData)
    }
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@GoBarber:token',
      '@GoBarber:refreshtoken',
      '@GoBarber:user',
      '@GoBarber:useranswers',
    ])

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
        modifyUser,
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
