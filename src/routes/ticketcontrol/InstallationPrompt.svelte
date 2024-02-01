<script>
    import { onMount } from 'svelte';
    let deferredPrompt;

    onMount(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e; // Save the event
        });
    });

    const showInstallPrompt = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Show the install prompt
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        }
    };
</script>

<button on:click={showInstallPrompt} class="bg-tileBlue px-4 py-2 rounded-md text-textWhite duration-300">Install App</button>
