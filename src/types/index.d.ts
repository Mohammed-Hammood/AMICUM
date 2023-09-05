declare type User = {
  id: number
  name: string
  address: string
  birthday: string
  certification_after: number
  completed_tests: number
  total_tests:number;
  department: string
  email: string
  hire_date: string
  instruction: boolean
  preshift_examiner: boolean
  notifications_count: number
  phone: string
  position_name: string
  random_number: string
  username: string
}


type SidebarData = {
	interval: null | number;
	icons: { [key: string]: string };
	time: string;
	images: { id: number, image?: string, title: string }[];
}


declare module 'vue3-circle-progress';