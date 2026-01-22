export function Header() {
  return `
    <header>
      <div class="max-w-[1800px] mx-auto border-b py-2 px-5 flex items-center justify-between" id="cartContainer">
        <div class="flex gap-6 items-center">
          <label for="filters-siderbar" class="btn btn-ghost btn-circle sm:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <nav>
            <ul>
              <li><a href="/about" class="hover:text-blue-300">About</a></li>
            </ul>
          </nav>
        </div>
        <label for="cart-drawer" class="relative cursor-pointer">
          <div id="cartQuantity"
            class="absolute -left-1/2 -top-1 min-w-5 h-5 text-sm rounded-full grid place-items-center bg-black text-white leading-none invisible">
          </div>
          <div class="text-3xl">
            &#128722;
          </div>
        </label>
      </div>
    </header>
  `;
}
