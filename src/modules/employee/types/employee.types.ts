export interface Employee {
  id: number
  code: string
  fullName: string
  occupation: string
  department: string
  employmentDate: string
  terminationDate?: string | null
}
