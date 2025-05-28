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

<div class="max-w-md mx-auto p-8">
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h1 class="card-title text-3xl text-center mb-8">Login</h1>
      
      <div class="space-y-8">
        <div class="card bg-base-200">
          <div class="card-body">
            <h2 class="card-title">Sign in with Google</h2>
            <button on:click={() => signIn("google", { callbackUrl: "/profile" })} 
              class="btn btn-primary w-full">
              Continue with Google
            </button>
          </div>
        </div>
        
        <div class="divider">OR</div>
        
        <div class="card bg-base-200">
          <div class="card-body">
            <h2 class="card-title">Sign in with Email</h2>
            <p class="text-base-content/70">We'll send you a magic link to your email</p>
            
            <form on:submit|preventDefault={handleEmailSignIn}>
              <div class="form-control w-full">
                <label class="label" for="email">
                  <span class="label-text">Email</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  bind:value={email} 
                  placeholder="your@email.com" 
                  required
                  class="input input-bordered w-full"
                />
              </div>
              
              <button type="submit" disabled={isLoading} 
                class="btn btn-neutral w-full mt-4">
                {isLoading ? "Sending..." : "Send Magic Link"}
              </button>
              
              {#if message}
                <div class="alert mt-4">
                  <span>{message}</span>
                </div>
              {/if}
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>