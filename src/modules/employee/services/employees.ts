import type { Employee } from '../types/employee.types'
import type { Filters } from '../types/filter.types'

let db: Employee[] = generateFakeEmployees(50)

export async function fetchEmployees(
  page: number,
  perPage: number,
  filters: {
    search?: string
    department?: string
    sortBy?: keyof Employee
    direction?: 'asc' | 'desc'
  } = {},
): Promise<{ data: Employee[]; total: number }> {
  let list = [...db]

  if (filters.search) {
    const q = filters.search.toLowerCase()
    list = list.filter((e) =>
      `${e.fullName} ${e.occupation} ${e.department}`.toLowerCase().includes(q),
    )
  }

  if (filters.department) {
    list = list.filter((e) => e.department === filters.department)
  }

  if (filters.sortBy) {
    const key = filters.sortBy
    const direction = filters.direction ?? 'asc'

    list.sort((a, b) => {
      const aVal = a[key] ?? ''
      const bVal = b[key] ?? ''

      const isDate = key === 'employmentDate' || key === 'terminationDate'
      const aParsed = isDate ? new Date(aVal as string).getTime() : String(aVal).toLowerCase()
      const bParsed = isDate ? new Date(bVal as string).getTime() : String(bVal).toLowerCase()

      if (aParsed < bParsed) return direction === 'asc' ? -1 : 1
      if (aParsed > bParsed) return direction === 'asc' ? 1 : -1
      return 0
    })
  }

  const total = list.length
  const start = (page - 1) * perPage
  const data = list.slice(start, start + perPage)

  return new Promise((resolve) => setTimeout(() => resolve({ data, total }), 250))
}
/* CRUD helpers */
export const addEmployee = (e: Employee) => {
  db.unshift(e)
}
export const updateEmployee = (e: Employee) => {
  const i = db.findIndex((d) => d.id === e.id)
  if (i !== -1) db[i] = e
}

export const deleteEmployee = (id: number) => {
  db = db.filter((d) => d.id !== id)
}

export async function fetchAllEmployees(filters?: Filters): Promise<Employee[]> {
  let list = [...db]

  if (filters?.search) {
    const q = filters.search.toLowerCase()
    list = list.filter((e) =>
      `${e.fullName} ${e.occupation} ${e.department}`.toLowerCase().includes(q),
    )
  }

  if (filters?.department) {
    list = list.filter((e) => e.department === filters.department)
  }

  return new Promise((res) => setTimeout(() => res(list), 250))
}

function generateFakeEmployees(count: number): Employee[] {
  const departments = ['HR', 'Tech', 'Finance', 'Design', 'Marketing']
  const occupations = ['Manager', 'Developer', 'Analyst', 'Designer']
  const names = ['Riam', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']

  const randomDate = (start: Date, end: Date) =>
    new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))

  return Array.from({ length: count }, (_, i) => {
    const fullName = `${names[i % names.length]} ${String.fromCharCode(65 + (i % 26))}`
    const occupation = occupations[i % occupations.length]
    const department = departments[i % departments.length]

    let employmentDate: Date
    let terminationDate: Date | null = null

    const statusSeed = i % 4

    if (statusSeed === 0) {
      employmentDate = randomDate(new Date(), new Date(2025, 11, 31))
    } else {
      employmentDate = randomDate(new Date(2020, 0, 1), new Date())
      if (statusSeed === 1) {
        terminationDate = null
      } else if (statusSeed === 2) {
        terminationDate = randomDate(new Date(employmentDate.getTime() + 30 * 86400000), new Date())
      } else if (statusSeed === 3) {
        terminationDate = randomDate(new Date(), new Date(2025, 11, 31))
      }
    }

    return {
      id: i + 1,
      code: `EMP${(i + 1).toString().padStart(3, '0')}`,
      fullName,
      occupation,
      department,
      employmentDate: employmentDate.toISOString().split('T')[0],
      terminationDate: terminationDate ? terminationDate.toISOString().split('T')[0] : null,
    }
  })
}
