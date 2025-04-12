<script lang="ts">
    import { page } from "$app/state"
    import { signIn, signOut } from "@auth/sveltekit/client"


	let { children } = $props();
</script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">

<nav class="container">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/posts">Blog</a></li>
  </ul>
  <div class="auth">
    {#if page.data?.session}
      {#if page.data.session.user?.image}
        <img
          src={page.data.session.user.image}
          class="avatar"
          alt="User Avatar"
        />
      {/if}
      <details class="dropdown" id="profile-dropdown">
        <summary>
          <span class="signedInText">
            <small>Signed in as</small>
            <strong>{page.data.session.user?.name ?? "User"}</strong>
          </span>
        </summary>
        <ul dir="rtl">
          <li><a onclick={() => signOut()} href="#">Logout</a></li>
        </ul>
      </details>



    {:else}
      <button onclick={() => signIn("discord")}>Sign In with Discord</button>
    {/if}
  </div>
</nav>

<main class="container">
  {@render children()}
</main>


<style>


</style>