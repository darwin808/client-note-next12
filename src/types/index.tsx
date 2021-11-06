export interface IUpdatePost {
  userName?: string
  message: string
  picture?: string
  id: number | string
  e?: any
}

export interface ICreatePost {
  userName?: string
  message?: string
  picture?: string
  e?: any
}
export interface CardBody {
  userName?: string
  message?: string
  id?: string
  picture?: string[]
}
export interface ICard<T> {
  data?: T
  onClick?: (e: any) => void
  onSubmit: (e: any) => any
  modal?: boolean
  title?: string
}
