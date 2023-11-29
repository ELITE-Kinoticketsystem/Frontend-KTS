<script lang="ts">
  export let rating = 0.0; //out of 5 rating
  export const bgColor = "backgroundBlue";
  import { Rating } from "flowbite-svelte";
</script>

<div class="bg-{bgColor} w-fit h-fit flex flex-row">
  <div class="flex mx-auto my-auto">
    <p class="text-textWhite text-center">Rating:</p>
  </div>
  <div class="flex">
    <Rating id="ratingLab" total={5} {rating}>
      <p slot="text" class="text-textWhite text-center text-sm">
        {rating} out of 5
      </p>
    </Rating>
  </div>
</div>
