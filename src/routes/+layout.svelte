<script lang="ts">
    import { page } from "$app/stores"
    import { signIn, signOut } from "@auth/sveltekit/client"


	let { children } = $props();
</script>


<nav class="container">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/posts">Blog</a></li>
    {#if $page.data?.session}
      <li><a href="/profile">Profile</a></li>
    {/if}
  </ul>
  <div class="auth">
    {#if $page.data?.session}
      {#if $page.data.session.user?.image}
        <img
          src={$page.data.session.user.image}
          class="avatar"
          alt="User Avatar"
        />
      {/if}
      <details class="dropdown" id="profile-dropdown">
        <summary>
          <span class="signedInText">
            <small>Signed in as</small>
            <strong>{$page.data.session.user?.name ?? "User"}</strong>
          </span>
        </summary>
        <ul dir="rtl">
          <li><a onclick={() => signOut()} href="#">Logout</a></li>
        </ul>
      </details>



    {:else}
      <div class="login-options">
        <button onclick={() => signIn("discord")}>Sign In with Discord</button>
        <a href="/login" class="login-link">More login options</a>
      </div>
    {/if}
  </div>
</nav>

<main class="container">
  {@render children()}
</main>

<footer>
  <div class="container">
    <p>&copy; {new Date().getFullYear()} Kid Chores App</p>
  </div>
</footer>


<style>
  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.6;
    color: #333;
    background-color: #f8f9fa;
  }

  :global(a) {
    color: #3273dc;
    text-decoration: none;
  }

  :global(a:hover) {
    text-decoration: underline;
  }

  :global(button) {
    background-color: #3273dc;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s;
  }

  :global(button:hover) {
    background-color: #2366c2;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid #eaeaea;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  }

  nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 1.5rem;
  }

  nav a {
    font-weight: 500;
    color: #4a4a4a;
    text-decoration: none;
  }

  nav a:hover {
    color: #3273dc;
  }

  main {
    min-height: calc(100vh - 140px);
    padding: 2rem 0;
  }

  footer {
    text-align: center;
    padding: 1.5rem 0;
    background-color: white;
    border-top: 1px solid #eaeaea;
    font-size: 0.9rem;
    color: #666;
  }

  .auth {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid #eaeaea;
  }

  .login-options {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .login-link {
    font-size: 0.8rem;
    color: #666;
  }

  .dropdown {
    position: relative;
    cursor: pointer;
  }

  .dropdown summary {
    display: flex;
    align-items: center;
    list-style: none;
  }

  .dropdown summary::-webkit-details-marker {
    display: none;
  }

  .dropdown ul {
    position: absolute;
    right: 0;
    top: 100%;
    width: 200px;
    margin-top: 0.5rem;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 0;
    z-index: 100;
  }

  .dropdown ul li {
    display: block;
    padding: 0.5rem 1rem;
  }

  .signedInText {
    display: flex;
    flex-direction: column;
    margin-left: 0.5rem;
    line-height: 1.2;
  }

  .signedInText small {
    font-size: 0.7rem;
    color: #666;
  }
</style>