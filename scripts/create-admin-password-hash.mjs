import { randomBytes, scryptSync } from 'node:crypto'
import { stdin, stdout } from 'node:process'

function readPassword() {
  return new Promise((resolve, reject) => {
    let password = ''
    const wasRaw = Boolean(stdin.isRaw)

    stdout.write('Пароль администратора: ')
    stdin.setRawMode?.(true)
    stdin.resume()

    const onData = (chunk) => {
      const value = chunk.toString()

      if (value === '\u0003') {
        stdin.setRawMode?.(wasRaw)
        stdin.pause()
        stdin.off('data', onData)
        reject(new Error('Ввод отменён'))
        return
      }

      if (value === '\r' || value === '\n') {
        stdout.write('\n')
        stdin.setRawMode?.(wasRaw)
        stdin.pause()
        stdin.off('data', onData)
        resolve(password)
        return
      }

      if (value === '\u007f') {
        password = password.slice(0, -1)
        return
      }

      password += value
    }

    stdin.on('data', onData)
  })
}

const password = await readPassword()

if (!password) {
  throw new Error('Пароль не может быть пустым')
}

const cost = 16_384
const blockSize = 8
const parallelization = 1
const salt = randomBytes(16)
const hash = scryptSync(password, salt, 64, {
  N: cost,
  r: blockSize,
  p: parallelization,
  maxmem: 64 * 1024 * 1024,
})

process.stdout.write(
  `ADMIN_PASSWORD_HASH=scrypt$${cost}$${blockSize}$${parallelization}$${salt.toString('base64url')}$${hash.toString('base64url')}`,
)
