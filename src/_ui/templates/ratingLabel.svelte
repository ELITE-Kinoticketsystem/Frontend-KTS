<script lang="ts">
    export let rating = 0.0; //out of 5 rating
    export const bgColor = "backgroundBlue";
    import { Rating } from "flowbite-svelte";
</script>

<div class="bg-{bgColor} w-fit h-fit pr-3 flex flex-row">
    <div class="flex mx-auto my-auto">
        <p class="text-textWhite text-4xl text-center">Rating:</p>
    </div>
    <div class="flex mx-5">
        <Rating id="ratingLab" total={5} size={50} {rating} />
    </div>
    <div class="flex">
        <p
            class="mx-auto my-auto text-sm font-medium text-textWhite dark:text-brightTextGray"
        >
            {rating} out of 5
        </p>
    </div>
</div>
