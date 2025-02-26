<script lang="ts">
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    
    export let data;
    let title = data.post.title;
    let content = data.post.content;

    async function updatePost(event: SubmitEvent) {
        event.preventDefault();

        const response = await fetch('/api/posts', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: page.params.id,
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

<h1>Edit Post</h1>

<form on:submit={updatePost}>
    <label>
        Title
        <input type="text" bind:value={title} required>
    </label>

    <label>
        Content
        <textarea bind:value={content} required></textarea>
    </label>

    <button type="submit">Update Post</button>
</form>