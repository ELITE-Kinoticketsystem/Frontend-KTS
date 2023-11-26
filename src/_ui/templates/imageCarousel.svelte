<script lang="ts">
    export let srcs: Array<string> = [];
    let currentImg = 0;
    
    function increaseIndex(){ currentImg = (currentImg + 1) % srcs.length; }
    function decreaseIndex(){ --currentImg; if(currentImg < 0) {currentImg = srcs.length - 1; }
    }
    
</script>

<div class="relative">
    <div class="overflow-hidden w-96 h-36rem">
        <img src={srcs[currentImg]} alt="Imajge" class="w-full h-full object-cover mx-auto" />
    </div>
    <button class="absolute  left-0 top-1/2 -translate-y-1/2 rounded-full p-2 ml-1
                   opacity-60 bg-white text-center hover:bg-slate-300" 
                   on:click={decreaseIndex}>
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <path d="M14 18l-6-6 6-6" />
                  </svg>
    </button>
    <button class="absolute right-0 top-1/2 -translate-y-1/2 rounded-full p-2 mr-1
                   opacity-60 bg-white text-center hover:bg-slate-300"
                   on:click={increaseIndex}>
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" >
                    <path d="M10 18l6-6-6-6" />
                  </svg>
    </button>

  </div>


