<script lang="ts">
    export placeholder = "";
</script>

<input
id="streetInput"
        class="w-full h-full rounded-lg p-2 pl-3 duration-300 text-[100%] text-textWhite
           border border-gray-300 bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
        type="text"
        maxlength="24"
        placeholder="Street"
        bind:value={Street}
        />
