<template>
  <div
    :class="$attrs.class"
    class="drawer drawer-mobile sidenav hidden lg:flex w-92"
  >
    <div class="drawer border-r-2 border-gray-300">
      <ul class="menu p-0 w-80 bg-gray-200 text-base-content pt-1">
        <div class="p-1">
          <template
            :key="item.name"
            v-for="item in menu"
          >
            <li v-if="!item.dropdown">
              <NuxtLink
                :to="item.href"
                active-class="active"
              >{{ item.name }}</NuxtLink>
            </li>
            <template v-if="item.dropdown">
              <li class="px-2 font-bold text-zinc-500 border-t-2 border-zinc-400 first pt-1">{{ item.name }}</li>
              <li
                :class="item.list.length - 1 === index ? 'border-b-2 border-zinc-400 last' : ''"
                :key="itemList.name"
                class="px-4"
                v-for="(itemList, index) in item.list"
              >
                <NuxtLink
                  :to="itemList.href"
                  active-class="active"
                >{{ itemList.name }}</NuxtLink>
              </li>
            </template>
          </template>
        </div>
      </ul>
    </div>
  </div>
  <div
    class="bg-gray-300 lg:hidden h-10 w-full z-100 border-b border-gray-700"
    ref="navbarRefs"
  >
    <div class="navbar-start w-full">
      <div class="dropdown flex w-full h-[35px]">
        <label
          class="btn-ghost lg:hidden content-end pl-2 pt-1"
          tabindex="0"
        >
          <svg
            class="inline-block w-5 h-5 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </label>
        <div class="flex justify-end w-full items-center">
          <app-button class="btn-sm mr-4 w-[48px]">
            <svg
              height="32"
              viewBox="0 0 24 24"
              width="32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5 23q-.625 0-1.063-.438T13 21.5v-7q0-.625.438-1.063T14.5 13h7q.625 0 1.063.438T23 14.5v7q0 .625-.438 1.063T21.5 23h-7Zm0-1.5h7v-.8q-.625-.775-1.525-1.238T18 19q-1.075 0-1.975.463T14.5 20.7v.8ZM18 18q.625 0 1.063-.438T19.5 16.5q0-.625-.438-1.063T18 15q-.625 0-1.063.438T16.5 16.5q0 .625.438 1.063T18 18Zm-6-6Zm.05-3.5q-1.45 0-2.475 1.025T8.55 12q0 1.2.675 2.1T11 15.35V13.1q-.2-.2-.325-.513T10.55 12q0-.625.438-1.063t1.062-.437q.35 0 .625.138t.475.362h2.25q-.325-1.1-1.238-1.8t-2.112-.7ZM11 22h-.875q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.613-.3t-.562-.375l-2.175.9q-.35.15-.7.038t-.55-.438L2.4 15.4q-.2-.325-.125-.7t.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L2.65 9.9q-.3-.225-.375-.6t.125-.7l1.85-3.225q.2-.325.55-.438t.7.038l2.175.9q.275-.2.575-.375t.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3t.562.375l2.175-.9q.35-.15.7-.038t.55.438l1.85 3.25q.2.325.125.688t-.375.587L19.925 11H17.4q-.025-.125-.05-.263t-.075-.262l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.213-.962t-1.437-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.6.625 1.35 1.05T11 17.4V22Z"
                fill="#525252"
              />
            </svg>
          </app-button>
          <app-button class="btn-sm mr-4 w-[48px]">
            <svg
              height="32"
              viewBox="0 0 24 24"
              width="32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 21q-.825 0-1.413-.588T3 19v-4h2v4h14V5H5v4H3V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Zm5.5-4l-1.4-1.45L11.65 13H3v-2h8.65L9.1 8.45L10.5 7l5 5l-5 5Z"
                fill="#525252"
              />
            </svg>
          </app-button>
        </div>
        <ul
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-200 rounded-box w-52"
          tabindex="0"
        >
          <template
            :key="item.name"
            v-for="item in menu"
          >
            <li v-if="!item.dropdown">
              <NuxtLink
                :to="item.href"
                active-class="active"
              >{{ item.name }}</NuxtLink>
            </li>
            <template v-if="item.dropdown">
              <li
                class="parent-sidenav-list"
                tabindex="0"
              >
                <a class="justify-between">
                  {{ item.name }}
                  <svg
                    class="fill-current"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </a>
                <ul class="list-navbar p-2 bg-gray-200">
                  <li
                    :key="itemList.name"
                    v-for="itemList in item.list"
                  >
                    <NuxtLink
                      :to="itemList.href"
                      active-class="active duration-300"
                      class
                    >{{ itemList.name }}</NuxtLink>
                  </li>
                </ul>
              </li>
            </template>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

/**
 * @type Props
 * @param {Array} menu - Список меню
 */
type Props = {
  menu: any
  user: any
}

/* Установка значений по умолчанию для входящих значений */
const props = withDefaults(defineProps<Props>(), {
  menu: [],
  user: null
})

const emit = defineEmits(['title']) // Отправляемые события
const navbarRefs = ref() // Ссылка на элемент

/**
 ** Получение заголовка для формы
 * @function getTitleNav
 */
function getTitleNav() {
  const arr: any = []
  props.menu.forEach((el: any) => (!el.list ? arr.push(el) : arr.push(...el.list))) // Получение всех элементов меню
  const selectItem = arr.find((el: any) => el.href === route.currentRoute.value.path) // получение выделенного элемента
  emit('title', selectItem.name) // Отправка заголовка формы
}

/* При монтировании объекта */
onMounted(() => {
  const el = navbarRefs.value.querySelector('.parent-sidenav-list .active') // Поиск активного класса элемента
  if(el) el.parentNode.parentNode.parentNode.querySelector('a').classList.add('active') // Установка активного класса для элемента
  getTitleNav()
})

const route = useRouter() // Получение роута

/** Отслеживание изменения роута */
watch(
  () => route,
  () => {
    getTitleNav()
  },
  { deep: true },
)
</script>

<style>
  .sidenav {
    overflow-y: auto;
  }

  .sidenav .last {
    padding-bottom: 1em;
  }

  .sidenav .first {
    margin-top: 1em;
  }
</style>