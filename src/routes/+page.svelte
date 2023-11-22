<script>
    import MainRoundAbout from "../_ui/layout/mainRoundAbout.svelte";
    import FirstMainSiteElement from "../_ui/layout/_mainpage/firstMainSiteElement.svelte";
    import SecondMainSiteElement from "../_ui/layout/_mainpage/secondMainSiteElement.svelte";

    export let data;
    let imagesToCycle = data.first;

</script>

<main>
    <MainRoundAbout {imagesToCycle}/>
    <br />
    <div class="mx-16 mt-10">
        <FirstMainSiteElement />
    </div>
    <div class="mx-16 mt-10">
        <SecondMainSiteElement />
    </div>
</main>
