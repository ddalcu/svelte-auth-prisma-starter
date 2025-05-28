<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  onMount(() => {
    // Redirect if not logged in
    if (!$page.data.session) {
      goto("/login");
    }
  });
</script>

<div class="max-w-3xl mx-auto p-8">
  {#if $page.data.session}
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex items-center justify-between mb-8 pb-4 border-b border-base-300">
          <h1 class="text-3xl font-bold">Your Profile</h1>
          {#if $page.data.session.user?.image}
            <div class="avatar">
              <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={$page.data.session.user.image} alt="Profile" />
              </div>
            </div>
          {/if}
        </div>

        <div class="space-y-6">
          <h2 class="text-2xl font-semibold">Welcome, {$page.data.session.user?.name || "User"}!</h2>
          <p class="text-base-content/70">You are successfully logged in.</p>
          
          <div class="card bg-base-200">
            <div class="card-body">
              <h3 class="card-title">Account Details</h3>
              {#if $page.data.session.user?.role}
                <p><span class="font-semibold">Role:</span> {$page.data.session.user.role}</p>
              {/if}
              {#if $page.data.session.user?.id}
                <p><span class="font-semibold">User ID:</span> {$page.data.session.user.id}</p>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="flex justify-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
  {/if}
</div> 