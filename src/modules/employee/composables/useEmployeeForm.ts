import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmployeeStore } from '@/store/employees'
import type { Employee } from '@/modules/employee/types/employee.types'
import { useShowResponseMessage } from '@/composables/useShowResponseMessage'

export default function useEmployeeForm() {
  const store = useEmployeeStore()
  const route = useRoute()
  const router = useRouter()

  /* reactive fields */
  const isEditing = computed(() => Boolean(route.params.id))
  const employeeId = computed(() => Number(route.params.id) || Date.now())
  const fullName = ref('')
  const occupation = ref('')
  const department = ref('')
  const dateOfEmployment = ref('')
  const terminationDate = ref('')
  const errors = ref<Record<string, string>>({})

  /* list for <select> */
  const departments = [
    'Technology',
    'Human Resources',
    'Finance',
    'Marketing',
    'Operations',
    'Sales',
    'Administration',
    'Legal',
  ] as const

  const { showSuccess, showError } = useShowResponseMessage()

  /* hydrate when editing */
  onMounted(() => {
    if (!isEditing.value) return
    const emp = store.employees.find((e) => e.id === employeeId.value)
    if (emp) {
      fullName.value = emp.fullName
      occupation.value = emp.occupation
      department.value = emp.department
      dateOfEmployment.value = emp.dateOfEmployment
      terminationDate.value = emp.terminationDate ?? ''
    }
  })

  /* Add validation*/
  function validate(): boolean {
    const e: Record<string, string> = {}
    if (!fullName.value.trim()) e.fullName = 'Full name is required'
    if (!occupation.value.trim()) e.occupation = 'Occupation is required'
    if (!department.value) e.department = 'Department is required'
    if (!dateOfEmployment.value) e.dateOfEmployment = 'Employment date is required'
    errors.value = e
    return Object.keys(e).length === 0
  }

  function submit() {
    if (!validate()) return
    const emp: Employee = {
      id: employeeId.value,
      code: isEditing.value ? '' : `EMP${employeeId.value}`,
      fullName: fullName.value,
      occupation: occupation.value,
      department: department.value,
      dateOfEmployment: dateOfEmployment.value,
      terminationDate: terminationDate.value || null,
    }
    try {
      if (isEditing.value) {
        store.update(emp)
        showSuccess('Employee updated successfully!')
      } else {
        store.add(emp)
        showSuccess('Employee created successfully!')
      }

      router.push('/')
    } catch (err) {
      showError('Something went wrong. Please try again.')
      console.error(err)
    }
  }

  return {
    /* state */
    isEditing,
    fullName,
    occupation,
    department,
    dateOfEmployment,
    terminationDate,
    errors,
    departments,
    /* actions */
    submit,
  }
}
