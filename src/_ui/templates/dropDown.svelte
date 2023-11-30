<div class="flex">
  <button
    id="dropdownBgHoverButton"
    data-dropdown-toggle="dropdownBgHover"
    class="text-white bg-headerBlue hover:bg-buttonBlue duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
    type="button"
  >
    Dropdown
    <svg
      id="arrowRegion"
      class="w-2.5 h-2.5 ms-3 duration-300"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </button>
  <div
    id="regionDropDown"
    class="z-10 hidden w-48 bg-buttonBlue rounded-lg shadow absolute origin-top mt-2"
  >
    <ul
      class="p-3 space-y-1 text-sm text-textWhite"
      aria-labelledby="regionDropDown"
    >
      <li>
        <div
          class="flex items-center p-2 rounded hover:bg-headerBlue duration-300"
        >
          <input
            id="checkbox-item-1"
            type="checkbox"
            value=""
            class="w-4 h-4 text-tileBlue bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2"
          />
          <label
            for="checkbox-item-1"
            class="w-full ms-2 text-sm font-medium text-textWhite rounded"
            >Item</label
          >
        </div>
      </li>
    </ul>
  </div>
</div>
