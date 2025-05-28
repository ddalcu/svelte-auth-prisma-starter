<script lang="ts">
    import '../global.css';
    import { page } from "$app/stores";
    import { signIn, signOut } from "@auth/sveltekit/client";

    let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
    <nav class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <ul class="flex space-x-6">
                    <li><a href="/" class="text-gray-700 hover:text-blue-600 font-medium">Home</a></li>
                    <li><a href="/posts" class="text-gray-700 hover:text-blue-600 font-medium">Blog</a></li>
                    {#if $page.data?.session}
                        <li><a href="/profile" class="text-gray-700 hover:text-blue-600 font-medium">Profile</a></li>
                    {/if}
                </ul>
                <div class="flex items-center space-x-4">
                    {#if $page.data?.session}
                        {#if $page.data.session.user?.image}
                            <img
                                src={$page.data.session.user.image}
                                class="w-8 h-8 rounded-full border-2 border-gray-200"
                                alt="User Avatar"
                            />
                        {/if}
                        <details class="relative cursor-pointer" id="profile-dropdown">
                            <summary class="flex items-center">
                                <span class="flex flex-col ml-2">
                                    <small class="text-xs text-gray-500">Signed in as</small>
                                    <strong class="text-sm text-gray-700">{$page.data.session.user?.name ?? "User"}</strong>
                                </span>
                            </summary>
                            <ul class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                <li><button onclick={() => signOut()} class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button></li>
                            </ul>
                        </details>
                    {:else}
                        <div class="flex items-center space-x-3">
                            <a href="/login" class="btn btn-primary">Login</a>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </nav>

    <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {@render children()}
    </main>

    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
            <p>Copyright © {new Date().getFullYear()} - Svelte Starter App</p>
        </div>
    </footer>
</div>
