export interface ListInit {
  name: string
  roleId: number
  roleList?: ListInit[]
  viewRole?: string
}

export class InitData {
  authority: number[]
  id: number
  constructor(id:number, authority: number[]) {
    this.id = id
    this.authority = authority
  }
  list: ListInit[] = []
  treeRef:any
}
