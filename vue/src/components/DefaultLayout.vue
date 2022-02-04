<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="w-8 h-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
            </div>
            <div class="hidden md:block">
              <div class="flex items-baseline ml-10 space-x-4">
                <a
                  @click="logout"
                  class="text-white">logout</a>
                <router-link 
                  v-for="item in navigation" 
                  :key="item.name" 
                  :to="item.to"
                  active-class="text-white bg-gray-900"
                  :class="[
                    this.$route.name === item.to.name 
                      ? '' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium'
                  ]" 
                >{{ item.name }}</router-link>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="flex items-center ml-4 md:ml-6">
              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton class="flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span class="sr-only">Open user menu</span>
                    <img class="w-8 h-8 rounded-full" :src="user && user.imageUrl ? user.imageUrl : ''" alt="" />
                  </MenuButton>
                </div>
                <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                  <MenuItems class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-slot="{ active }">
                      <a 
                        @click="logout"
                        :href="item.href" 
                        :class="['block px-4 py-2 text-sm text-gray-700', 'cursor-pointer']"
                      >Sign out</a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="flex -mr-2 md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block w-6 h-6" aria-hidden="true" />
              <XIcon v-else class="block w-6 h-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <router-link 
            v-for="item in navigation" 
            :key="item.name" 
            :to="item.to" 
            active-class="text-white bg-gray-900"
            :class="[
              this.$route.name === item.to.name 
                ? '' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium'
            ]"
          >{{ item.name }}</router-link>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="w-10 h-10 rounded-full" :src="user && user.imageUrl ? user.imageUrl : ''" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">{{ user.name }}</div>
              <div class="text-sm font-medium leading-none text-gray-400">{{ user.email }}</div>
            </div>
          </div>
          <div class="px-2 mt-3 space-y-1">
            <DisclosureButton 
              as="a"
              @click="logout"
              class="block px-3 py-2 text-base font-medium text-gray-400 rounded-md cursor-pointer hover:text-white hover:bg-gray-700"
            >Sign out</DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <router-view></router-view>
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline';

import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import {computed} from 'vue';

const navigation = [
  { name: 'Dashboard', to: {name: 'Dashboard'}},
  { name: 'Surveys', to: {name: 'Surveys'}},
]
// const userNavigation = [
//   { name: 'Your Profile', to: '#' },
//   { name: 'Settings', to: '#' },
//   { name: 'Sign out', to: '#' },
// ]

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    // computed
    const user = computed(() => {
      return store.state.user.data
    });

    // methods
    const logout = () => {
      store.dispatch('logout')
        .then(() => {
          router.push({name: 'Login'});
        });
    }

    return {
      user,
      navigation,
      logout
    }
  },
}
</script>