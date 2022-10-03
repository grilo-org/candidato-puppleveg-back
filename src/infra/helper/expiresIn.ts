import dayjs from 'dayjs'

export const expiresIn = dayjs().add(15, 'second').unix()