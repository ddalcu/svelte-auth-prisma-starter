<script lang="ts">
    let activeTab = 'buttons';
</script>

<div class="hero w-full">
    <div class="hero-content text-center w-full max-w-7xl">
        <div class="w-full max-w-md">
            <h1 class="text-5xl font-bold">Welcome to Svelte Starter</h1>
            <div class="flex justify-center gap-4 mt-4">
                <div class="badge badge-primary">Prisma</div>
                <div class="badge badge-secondary">SqlLite</div>
                <div class="badge badge-accent">TailwindCSS</div>
            </div>
        </div>
    </div>
</div>

<div class="container mx-auto px-4 py-12 max-w-7xl">
    <h1 class="text-4xl font-bold text-center mb-8">DaisyUI Components Showcase</h1>
    
    <!-- Tabs -->
    <div class="tabs tabs-boxed justify-center mb-8">
        <button class="tab" class:tab-active={activeTab === 'buttons'} on:click={() => activeTab = 'buttons'}>Buttons</button>
        <button class="tab" class:tab-active={activeTab === 'cards'} on:click={() => activeTab = 'cards'}>Cards</button>
        <button class="tab" class:tab-active={activeTab === 'alerts'} on:click={() => activeTab = 'alerts'}>Alerts</button>
    </div>

    {#if activeTab === 'buttons'}
        <div class="flex flex-wrap gap-4 justify-center">
            <button class="btn btn-primary">Primary</button>
            <button class="btn btn-secondary">Secondary</button>
            <button class="btn btn-accent">Accent</button>
            <button class="btn btn-ghost">Ghost</button>
            <button class="btn btn-link">Link</button>
        </div>
    {:else if activeTab === 'cards'}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="card bg-base-100 shadow-xl">
                <figure><img src="https://picsum.photos/400/200" alt="Sample" /></figure>
                <div class="card-body">
                    <h2 class="card-title">Card Title</h2>
                    <p>This is a sample card with an image and some content.</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Action</button>
                    </div>
                </div>
            </div>
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Card Title</h2>
                    <p>This is a sample card without an image.</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-secondary">Action</button>
                    </div>
                </div>
            </div>
        </div>
    {:else if activeTab === 'alerts'}
        <div class="flex flex-col gap-4 max-w-md mx-auto">
            <div class="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>This is an info alert</span>
            </div>
            <div class="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>This is a success alert</span>
            </div>
            <div class="alert alert-warning">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>This is a warning alert</span>
            </div>
        </div>
    {/if}
</div>