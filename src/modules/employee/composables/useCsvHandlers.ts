import { ref } from 'vue'
import { fetchAllEmployees } from '@/modules/employee/services/employees'

export default function useCsvHandlers(
  store: ReturnType<typeof import('@/store/employees').useEmployeeStore>,
) {
  // Reference to the file input element used for CSV import
  const fileInput = ref<HTMLInputElement | null>(null)

  // Exports all employees to a downloadable CSV file
  async function exportToCSV() {
    const allEmployees = await fetchAllEmployees()
    const headers = ['Full Name', 'Occupation', 'Department', 'Employment Date', 'Termination Date']
    const rows = allEmployees.map((emp) => [
      emp.fullName,
      emp.occupation,
      emp.department,
      emp.employmentDate,
      emp.terminationDate ?? '',
    ])

    // Build CSV content string
    const csvContent = [headers, ...rows].map((e) => e.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    // Trigger file download
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'employees.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Imports employee data from a CSV file and adds them to the store
  function importCSV(event: Event) {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const text = reader.result as string
      const lines = text.trim().split('\n')
      const [header, ...rows] = lines

      // Convert each line to an employee object
      const employees = rows.map((line, i) => {
        const [fullName, occupation, department, employmentDate, terminationDate] = line.split(',')

        return {
          id: Date.now() + i, // Generate a unique ID based on timestamp
          code: `EMP${Date.now() + i}`,
          fullName,
          occupation,
          department,
          employmentDate,
          terminationDate: terminationDate || null,
        }
      })

      // Add each employee to the store and reload the first page
      employees.forEach((emp) => store.add(emp))
      store.loadPage(1)
    }

    reader.readAsText(file)
  }

  return {
    fileInput,
    exportToCSV,
    importCSV,
  }
}
