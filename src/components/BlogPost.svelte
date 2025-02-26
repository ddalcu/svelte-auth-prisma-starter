<script lang="ts">
    import { page } from "$app/stores";
    
    export let post: {
        id: string;
        title: string;
        content: string;
        authorId: string;
    };

    async function deletePost() {
        const response = await fetch('/api/posts', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: post.id,
                authorId: $page.data.session?.user?.id
            })
        });

        if (response.ok) {
            window.location.reload();
        }
    }
</script>

<article>
    <header>
        <h3>{post.title}</h3>
    </header>
    <p>{post.content}</p>
    {#if $page.data.session?.user?.id === post.authorId}
        <footer>
            <a href="/posts/{post.id}/edit" role="button" class="secondary">Edit</a>
            <button class="error" on:click={deletePost}>Delete</button>
        </footer>
    {/if}
</article>

<style>
    article {
        margin-bottom: 2rem;
    }
    footer {
        display: flex;
        gap: 1rem;
    }
</style>