<script lang="ts">
  import { apiUrl } from "$lib/_services/authService";

  let content = "";

  fetch(`${apiUrl}/events/58717D59AA3B11EEA77A0242AC120003`, {
    mode: "cors",
    credentials: "include",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      content += data.Description;
      content += data.Title;
    });
</script>

<!-- {#each names as name}
          <p class="text-black text-[100%]">
            {name}
          </p>
        {/each} -->

<!-- ring-1 ring-white w-[80%] mx-auto h-48  -->

<div class="flex ring-1 ring-white w-[80%] mx-auto h-48">
  <div class="relative w-80 overflow-hidden">
    <div
      class="absolute inset-0 overflow-y-scroll"
      style="width: calc(100% + 16px); scrollbar-width: none; -webkit-scrollbar-width: none;"
    >
      <!-- Your content here -->
      <p class="text-textWhite text-xl">
        {content}
        {["12:00", "20:00", "20:01", "21:00"].sort((a, b) => {
          return a > b ? 1 : -1;
        })[0]}
      </p>
      <!-- Add enough content to cause scrolling -->
    </div>
  </div>
</div>
