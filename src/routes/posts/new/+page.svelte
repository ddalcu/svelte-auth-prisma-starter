<script lang="ts">
    import { page } from "$app/state";
    import { goto } from "$app/navigation";

    let title = '';
    let content = '';

    async function createPost(event: SubmitEvent) {
        event.preventDefault();

        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                content,
                authorId: page.data.session?.user?.id
            })
        });

        if (response.ok) {
            goto('/posts');
        }
    }
</script>

<h1>Create New Post</h1>

<form on:submit={createPost}>
    <label>
        Title
        <input type="text" bind:value={title} required>
    </label>

    <label>
        Content
        <textarea bind:value={content} required></textarea>
    </label>

    <button type="submit">Create Post</button>
</form>