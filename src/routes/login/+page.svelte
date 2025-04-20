<script lang="ts">
  import { signIn } from "@auth/sveltekit/client";
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  
  let email = "";
  let isLoading = false;
  let message = "";

  onMount(() => {
    // If already logged in, redirect to profile
    if ($page.data.session) {
      goto("/profile");
    }
  });

  async function handleEmailSignIn() {
    isLoading = true;
    message = "";
    try {
      await signIn("email", { email, redirect: false });
      message = "Check your email for a magic link";
    } catch (error) {
      message = "Something went wrong. Please try again.";
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="login-container">
  <h1>Login</h1>
  
  <div class="login-methods">
    <div class="login-method">
      <h2>Sign in with Discord</h2>
      <button on:click={() => signIn("discord", { callbackUrl: "/profile" })}>
        Continue with Discord
      </button>
    </div>
    
    <div class="separator">OR</div>
    
    <div class="login-method">
      <h2>Sign in with Email</h2>
      <p>We'll send you a magic link to your email</p>
      
      <form on:submit|preventDefault={handleEmailSignIn}>
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            bind:value={email} 
            placeholder="your@email.com" 
            required
          />
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Magic Link"}
        </button>
        
        {#if message}
          <div class="message">
            {message}
          </div>
        {/if}
      </form>
    </div>
  </div>
</div>

<style>
  .login-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .login-methods {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .login-method {
    padding: 1.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  }
  
  .separator {
    text-align: center;
    font-weight: bold;
    margin: 0.5rem 0;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 0.75rem;
    background-color: #4a4a4a;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  button:hover {
    background-color: #333;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .message {
    margin-top: 1rem;
    padding: 0.75rem;
    text-align: center;
    background-color: #f0f0f0;
    border-radius: 4px;
  }
</style>