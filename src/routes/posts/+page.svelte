<script lang="ts">
    import { page } from "$app/state";
    import BlogPost from "../../components/BlogPost.svelte";

    export let data;
</script>

<div class="max-w-5xl mx-auto p-8">
    <div class="flex justify-between items-center mb-12">
        <h1 class="text-4xl font-bold">Blog Posts</h1>
        {#if page.data.session}
            <a href="/posts/new" class="btn btn-primary">Create New Post</a>
        {/if}
    </div>

    <div class="space-y-8">
        {#each data.posts as post}
            <BlogPost {post} />
        {/each}
    </div>
</div>