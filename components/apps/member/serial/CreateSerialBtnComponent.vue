<script setup lang='ts'>
import type { FormSubmitEvent } from '#ui/types'
import { type InferType, object, string } from 'yup'
import { useDistrictApi } from '~/apis'
import type { Role } from '~/types'

type Schema = InferType<typeof schema>

const state = ref({
  data: {
    districtId: '',
    email: undefined,
    password: undefined,
    role: 'user',
    notes: '',
  },
  modal: false,
})

const { data: getDistrictResponse } = useDistrictApi.getAll()
const districtOptions = computed(() => getDistrictResponse.value?.districts.map(district => ({
  label: district.name,
  value: district._id,
})))

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
  role: string().required('Required'),
  districtId: string().required('Required'),
})

const roleOptions: {
  label: string
  value: Role
}[] = [
  { label: 'Full Time', value: 'fullTime' },
  { label: 'District Leader', value: 'districtLeader' },
  { label: 'Shepherd', value: 'shepherd' },
  { label: 'User', value: 'user' },
]

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  // eslint-disable-next-line no-console
  console.log(event.data)
}
</script>

<template>
  <UButton @click="state.modal = true">
    新增序號
  </UButton>
  <UModal v-model="state.modal">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Modal
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="state.modal = false"
          />
        </div>
      </template>
      <div>
        <UForm
          :schema="schema"
          :state="state.data"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup
            label="Email"
            name="email"
          >
            <UInput v-model="state.data.email" />
          </UFormGroup>

          <UFormGroup
            label="Password"
            name="password"
          >
            <UInput
              v-model="state.data.password"
              type="password"
            />
          </UFormGroup>
          <UFormGroup
            name="role"
            label="權限"
          >
            <UInputMenu
              v-model="state.data.role"
              :options="roleOptions"
            />
          </UFormGroup>
          <UFormGroup
            name="districtId"
            label="District"
          >
            <UInputMenu
              v-model="state.data.districtId"
              :options="districtOptions"
            />
          </UFormGroup>
          <UButton type="submit">
            Submit
          </UButton>
        </UForm>
      </div>
    </UCard>
  </UModal>
</template>
