<script>
    import MainRoundAbout from "../_ui/layout/mainRoundAbout.svelte";
    import FirstMainSiteElement from "../_ui/layout/_mainpage/firstMainSiteElement.svelte";
    import SecondMainSiteElement from "../_ui/layout/_mainpage/secondMainSiteElement.svelte";
    import ThirdMainSiteElement from "../_ui/layout/_mainpage/thirdMainSiteElement.svelte";

    export let data;

    let moviesToDisplay = data.first;
</script>

<main>
    <div class="flex flex-col">
        <div class="flex mb-12">
            <MainRoundAbout {moviesToDisplay} />
        </div>

        <div class="flex mx-16 mt-3 bg-blue-600">
            <FirstMainSiteElement {moviesToDisplay} />
        </div>
        <div class="flex mx-16 mt-10">
            <ThirdMainSiteElement specialMovies={moviesToDisplay} />
        </div>
        <div class="flex mx-16 mt-10">
            <SecondMainSiteElement {moviesToDisplay} />
        </div>
    </div>
</main>
