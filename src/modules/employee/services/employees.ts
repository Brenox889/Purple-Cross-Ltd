import type { Employee } from '../types/employee.types'
import type { Filters } from '../types/filter.types'

let db: Employee[] = []

// Load data from the static JSON file only once
async function loadDataFromJSON() {
  if (db.length) return
  const res = await fetch('/employees.json')
  const json = await res.json()
  db = json
}

/**
 * Fetches a paginated, filtered, and sorted list of employees
 */
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
  await loadDataFromJSON()

  let list = [...db]

  // Apply search filter
  if (filters.search) {
    const q = filters.search.toLowerCase()
    list = list.filter((e) =>
      `${e.fullName} ${e.occupation} ${e.department}`.toLowerCase().includes(q),
    )
  }

  // Apply department filter
  if (filters.department) {
    list = list.filter((e) => e.department === filters.department)
  }

  // Apply sorting
  if (filters.sortBy) {
    const key = filters.sortBy
    const direction = filters.direction ?? 'asc'

    list.sort((a, b) => {
      const aVal = a[key] ?? ''
      const bVal = b[key] ?? ''

      const isDate = key === 'dateOfEmployment' || key === 'terminationDate'
      const aParsed = isDate ? new Date(aVal as string).getTime() : String(aVal).toLowerCase()
      const bParsed = isDate ? new Date(bVal as string).getTime() : String(bVal).toLowerCase()

      if (aParsed < bParsed) return direction === 'asc' ? -1 : 1
      if (aParsed > bParsed) return direction === 'asc' ? 1 : -1
      return 0
    })
  }

  // Paginate the result
  const total = list.length
  const start = (page - 1) * perPage
  const data = list.slice(start, start + perPage)

  // Simulate network delay
  return new Promise((resolve) => setTimeout(() => resolve({ data, total }), 250))
}

// Mocked add function (in-memory only)
export function addEmployee(e: Employee) {
  db.unshift(e)
  alert('aaaa')
}

// Mocked update function
export function updateEmployee(e: Employee) {
  const i = db.findIndex((d) => d.id === e.id)
  if (i !== -1) db[i] = e
}

// Mocked delete function
export function deleteEmployee(id: number) {
  db = db.filter((d) => d.id !== id)
}

/**
 * Fetch all employees (non-paginated) with optional filters
 */
export async function fetchAllEmployees(filters?: Filters): Promise<Employee[]> {
  await loadDataFromJSON()

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
