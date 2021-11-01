export interface IUpdatePost {
  name: string
  message: string
  id: number | string
  e?: any
}

export interface ICreatePost {
  name?: string
  message?: string
  e?: any
}
export interface CardBody {
  name?: string
  message?: string
  id?: string
}
export interface ICard<T> {
  data?: T
  onClick?: (e: any) => void
  onSubmit: (e: any) => any
  modal?: boolean
}
