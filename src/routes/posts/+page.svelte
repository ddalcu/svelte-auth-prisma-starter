<script lang="ts">
    import { page } from "$app/stores";
    import BlogPost from "../../components/BlogPost.svelte";

    export let data;
</script>

<h1>Blog Posts</h1>

{#if $page.data.session}
    <a href="/posts/new" role="button">Create New Post</a>
{/if}

<section>
    {#each data.posts as post}
        <BlogPost {post} />
    {/each}
</section>