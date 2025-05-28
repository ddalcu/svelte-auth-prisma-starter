<script lang="ts">
    import { page } from "$app/state";
    
    export let post: {
        id: string;
        title: string;
        content: string;
        authorId: string;
        createdAt?: string;
        updatedAt?: string;
    };

    async function deletePost() {
        if (!confirm('Are you sure you want to delete this post?')) return;
        
        const response = await fetch('/api/posts', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: post.id,
                authorId: page.data.session?.user?.id
            })
        });

        if (response.ok) {
            window.location.reload();
        }
    }
</script>

<article class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200">
    <div class="card-body">
        <header class="flex justify-between items-start gap-4 mb-6">
            <h2 class="card-title text-3xl font-bold">{post.title}</h2>
            {#if page.data.session?.user?.id === post.authorId}
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                    </div>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a href="/posts/{post.id}/edit">Edit Post</a></li>
                        <li><button class="text-error" on:click={deletePost}>Delete Post</button></li>
                    </ul>
                </div>
            {/if}
        </header>

        <div class="prose prose-lg max-w-none">
            <p class="whitespace-pre-wrap leading-relaxed">{post.content}</p>
        </div>

        <div class="card-actions justify-end mt-8 pt-4 border-t border-base-300">
            {#if post.createdAt}
                <div class="text-sm text-base-content/70">
                    Posted on {new Date(post.createdAt).toLocaleDateString()}
                </div>
            {/if}
            {#if post.updatedAt && post.updatedAt !== post.createdAt}
                <div class="text-sm text-base-content/70">
                    Updated on {new Date(post.updatedAt).toLocaleDateString()}
                </div>
            {/if}
        </div>
    </div>
</article>

<style>
    article {
        margin-bottom: 2rem;
    }
    :global(.prose) {
        max-width: none;
    }
    :global(.prose p) {
        margin-top: 1.5em;
        margin-bottom: 1.5em;
    }
</style>