'use server'

import { redirect } from 'next/navigation'
import { createAdminSession, isAdminEmail, verifyAdminPassword } from '../../../lib/admin-auth'

export type LoginState = {
  error: string
} | null

export async function loginAdmin(_: LoginState, formData: FormData): Promise<LoginState> {
  const email = typeof formData.get('email') === 'string' ? String(formData.get('email')) : ''
  const password = typeof formData.get('password') === 'string' ? String(formData.get('password')) : ''

  if (!isAdminEmail(email) || !verifyAdminPassword(password)) {
    return { error: 'Неверный email или пароль.' }
  }

  if (!(await createAdminSession())) {
    return { error: 'Авторизация не настроена на сервере.' }
  }

  redirect('/admin/analytics')
}
