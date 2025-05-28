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

<div class="max-w-5xl mx-auto p-8">
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h1 class="card-title text-4xl font-bold mb-8">Create New Post</h1>

            <form on:submit={createPost} class="space-y-8">
                <div class="form-control w-full">
                    <label class="label" for="title">
                        <span class="label-text text-lg">Title</span>
                    </label>
                    <input type="text" id="title" bind:value={title} required 
                        class="input input-bordered w-full text-lg" placeholder="Enter your post title" />
                </div>

                <div class="form-control w-full">
                    <label class="label" for="content">
                        <span class="label-text text-lg">Content</span>
                    </label>
                    <textarea id="content" bind:value={content} required 
                        class="textarea textarea-bordered h-64 text-lg" placeholder="Write your post content here..."></textarea>
                </div>

                <div class="flex justify-end gap-4">
                    <a href="/posts" class="btn btn-ghost">Cancel</a>
                    <button type="submit" class="btn btn-primary">Create Post</button>
                </div>
            </form>
        </div>
    </div>
</div>