<script lang="ts">
  let isOpen = false;
  export let type = "item";
  export let items = [{"name": "Item 1", "href": "x"}, {"name": "Item 2", "href": "x"}];
  let expandedItems = items.unshift({"name" : `Select ${type}`, "href" : ""});
  export let color = "bg-slate-400";
  export let hoverColor = "hover:bg-slate-300";
</script>

<div class="relative">
    <select class="{color} {hoverColor} rounded-md">
        {#each expandedItems as item}
            <div class="{color} {hoverColor} rounded-md">
                <a href={item.href}></a>
            </div>
        {/each}
        <option value="java" selected>Java</option>
        <option value="javascript" >JavaScript</option>
        <option value="python">Python</option>
        <option value="c++">C++</option>
    </select>
</div>