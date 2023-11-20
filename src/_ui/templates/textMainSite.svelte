<script lang="ts">
    export let text: string;
    export let href: string;
</script>

<div class="mb-8">
    <a {href} class="font-bold text-textWhite">
        <div class="flex">
            <p class="flex font-bold text-buttonBlue text-md">Cinemika&nbsp;</p>
            - {text}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                width="20"
                height="20"
                focusable="false"
                class="text-textWhite fill-current mt-0.5"
                ><path
                    d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"
                />
            </svg>
        </div>
    </a>
</div>
