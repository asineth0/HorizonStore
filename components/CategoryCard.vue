<template>
    <div class="category-card">
        <div class="category-card__image">
            <NuxtImg
                :src="image"
                :alt="$t('category.image_alt', { name: category.name })"
                width="80px"
                height="80px"
            />
        </div>

        <div class="category-card__header">
            <h4>{{ category.name }}</h4>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Category } from "~/types";

interface CategoryCardProps {
    image: string;
    category: Category;
}

defineProps<CategoryCardProps>();
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.category-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/ 1;
    border-radius: $category-card-border-radius;
    border: $category-card-border;
    min-width: $category-card-min-width;
    background: $category-card-bg;
    box-shadow: var(--horizon-shadow);
    backdrop-filter: blur(18px);
    padding: 22px;
    transition:
        transform var(--horizon-motion-base) var(--horizon-ease-in-out),
        border-color var(--horizon-motion-base) var(--horizon-ease-in-out),
        box-shadow var(--horizon-motion-base) var(--horizon-ease-in-out);

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 24px 54px rgba(0, 0, 0, 0.28);
    }

    img {
        object-fit: contain;
        filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.22));
        transition: transform var(--horizon-motion-slow)
            var(--horizon-ease-in-out);
    }

    &:hover img {
        transform: scale(1.04);
    }

    &__header {
        margin-top: 18px;
        text-align: center;
    }
}
</style>
