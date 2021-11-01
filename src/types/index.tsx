export interface IUpdatePost {
  name: string
  message: string
  id: number | string
}

export interface ICreatePost {
  name?: string
  message?: string
}
