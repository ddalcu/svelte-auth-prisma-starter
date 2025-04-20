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

<div class="profile-container">
  {#if $page.data.session}
    <div class="profile-header">
      <h1>Your Profile</h1>
      {#if $page.data.session.user?.image}
        <img 
          src={$page.data.session.user.image} 
          alt="Profile" 
          class="profile-image"
        />
      {/if}
    </div>

    <div class="profile-info">
      <h2>Welcome, {$page.data.session.user?.name || "User"}!</h2>
      <p>You are successfully logged in.</p>
      
      <div class="account-details">
        <h3>Account Details</h3>
        {#if $page.data.session.user?.role}
          <p><strong>Role:</strong> {$page.data.session.user.role}</p>
        {/if}
        {#if $page.data.session.user?.id}
          <p><strong>User ID:</strong> {$page.data.session.user.id}</p>
        {/if}
      </div>
    </div>
  {:else}
    <p>Loading...</p>
  {/if}
</div>

<style>
  .profile-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .profile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eaeaea;
  }

  .profile-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .profile-info {
    margin-top: 1rem;
  }

  .account-details {
    margin-top: 2rem;
    padding: 1rem;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  h1 {
    margin: 0;
    color: #333;
  }

  h2 {
    color: #444;
  }

  h3 {
    color: #555;
    margin-top: 0;
  }
</style> 