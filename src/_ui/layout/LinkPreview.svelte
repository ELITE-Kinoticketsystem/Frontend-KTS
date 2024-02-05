<script>
  import { onMount, afterUpdate } from "svelte";
  import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

  export let url = "";

  onMount(() => {
    getLinkPreview(
      "https://cinemika.germanywestcentral.cloudapp.azure.com/"
    ).then((data) => console.debug(data));
  });
</script>
