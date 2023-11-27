<script>
    import MainRoundAbout from "../_ui/layout/mainRoundAbout.svelte";
    import FirstMainSiteElement from "../_ui/layout/_mainpage/firstMainSiteElement.svelte";
    import SecondMainSiteElement from "../_ui/layout/_mainpage/secondMainSiteElement.svelte";
    import ThirdMainSiteElement from "../_ui/layout/_mainpage/thirdMainSiteElement.svelte";

    export let data;

    let moviesToDisplay = data.first;
</script>

<main>
    <MainRoundAbout {moviesToDisplay} />
    <br />
    <div class="mx-16 mt-3">
        <FirstMainSiteElement {moviesToDisplay} />
    </div>
    <div class="mx-16 mt-10">
        <ThirdMainSiteElement specialMovies={moviesToDisplay} />
    </div>
    <div class="mx-16 mt-10">
        <SecondMainSiteElement {moviesToDisplay} />
    </div>
</main>
