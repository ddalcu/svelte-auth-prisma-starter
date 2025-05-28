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

<div class="max-w-2xl mx-auto p-8">
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h1 class="card-title text-3xl mb-6">Edit Post</h1>

            <form on:submit={updatePost} class="space-y-6">
                <div class="form-control w-full">
                    <label class="label" for="title">
                        <span class="label-text">Title</span>
                    </label>
                    <input type="text" id="title" bind:value={title} required 
                        class="input input-bordered w-full" />
                </div>

                <div class="form-control w-full">
                    <label class="label" for="content">
                        <span class="label-text">Content</span>
                    </label>
                    <textarea id="content" bind:value={content} required 
                        class="textarea textarea-bordered h-32"></textarea>
                </div>

                <button type="submit" class="btn btn-primary w-full">Update Post</button>
            </form>
        </div>
    </div>
</div>