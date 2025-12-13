import { resolve } from 'node:path'
import process from 'node:process'

const root = process.cwd()
export const r = (...args) => resolve(root, ...args)
export const isDev = process.env.NODE_ENV === 'development'
export const port = Number(process.env.PORT || '') || 3000
