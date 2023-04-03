export interface ListInt {
  authority: number[],
  roleId: number,
  roleName: string
}

interface EditInt {
  roleId: number,
  roleName: string
}

export class InitData {
  list: ListInt[] = []
  EditForm:EditInt = {
    roleId: 0,
    roleName: ''
  }
  isShow = false
}
