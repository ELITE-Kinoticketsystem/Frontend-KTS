<script lang="ts">
  export let seat: any;
  export let isDoubleSeat: boolean = false;

  const seatColorTypes: { [seatType: string]: string } = {
    normal: "#1b8dec",
    louge: "#FFA503",
    vip: "#800080",
    reserved: "#FF0000",
    selected: "#008001",
    empty: "",
  };
  const seatColor = seatColorTypes[seat.type];
</script>

{#if !isDoubleSeat}
  <div class="">
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="h-max w-max"
    >
      <path
        d="M0 26C0 20.4772 4.47715 16 10 16H30C35.5228 16 40 20.4772 40 26V40H0V26Z"
        fill={seatColor}
      />
      <path
        d="M6 10C6 4.47715 10.4772 0 16 0H24C29.5228 0 34 4.47715 34 10V40H6V10Z"
        fill={seatColor}
      />
    </svg>
  </div>
{:else}
  <div class="">
    <svg
      width="95"
      height="40"
      viewBox="0 0 95 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="h-max w-max"
    >
      <path
        d="M0 26C0 20.4772 4.47715 16 10 16H85C90.5228 16 95 20.4772 95 26V40H0V26Z"
        fill={seatColor}
      />
      <path
        d="M6 10C6 4.47715 10.4772 0 16 0H79C84.5229 0 89 4.47715 89 10V40H6V10Z"
        fill={seatColor}
      />
    </svg>
  </div>
{/if}
