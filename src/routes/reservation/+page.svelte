<script>
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";

  browser ? history.back() : goto("/");
</script>
