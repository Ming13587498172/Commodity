export interface ListInt {
  id: number,
  nickName: string,
  role: RoleInt[],
  userName: string
}

interface RoleInt {
  role: number,
  roleName: string
}

interface selectDataInt {
  role: number,
  nickName: string
}

interface RoleListInt {
  authority: number[]
  roleId: number,
  roleName: string
}

interface EditInt {
  id: number,
  nickName: string,
  role: number[],
  userName: string
}

export class ListData {
  selectData:selectDataInt = {
    nickName: '',
    role: 0
  }
  EditForm:EditInt = {
    id: 0,
    nickName: '',
    role: [],
    userName: ''
  }
  List:ListInt[] = []
  roleList:RoleListInt[] = []
  isShow = false
} 
