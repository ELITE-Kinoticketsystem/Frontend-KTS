<script lang="ts">
    export let text: string;
    export let href: string;
</script>

<div class="mb-4">
    <div class="flex">
        <a {href} class="font-bold text-textWhite flex">
            <p class="gradient flex font-bold text-md">Cinemika&nbsp;</p>
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
        </a>
    </div>
</div>

<style>
    .gradient {
        background: rgb(135, 147, 149);
        background: linear-gradient(
            90deg,
            rgba(135, 147, 149, 1) 0%,
            rgba(137, 163, 190, 1) 100%
        );
        background-size: 100%;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
    }
</style>
