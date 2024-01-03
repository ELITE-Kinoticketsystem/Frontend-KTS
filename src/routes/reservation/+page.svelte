<script>
  import { goto } from "$app/navigation";
</script>

<button
  on:click={() => {
    goto("/tickets/1");
  }}>Reserve</button
>
