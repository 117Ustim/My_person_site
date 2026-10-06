'use client'

import { useActionState } from 'react'
import { loginAdmin, type LoginState } from './actions'
import styles from './page.module.css'

const initialState: LoginState = null

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState)

  return (
    <form className={styles.form} action={formAction}>
      <label className={styles.label} htmlFor="email">
        Email
      </label>
      <input className={styles.input} id="email" name="email" type="email" autoComplete="email" required />

      <label className={styles.label} htmlFor="password">
        Пароль
      </label>
      <input
        className={styles.input}
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />

      {state?.error ? (
        <p className={styles.error} role="alert">
          {state.error}
        </p>
      ) : null}

      <button className={styles.submit} type="submit" disabled={isPending}>
        {isPending ? 'Проверяем…' : 'Войти'}
      </button>
    </form>
  )
}
