<template>
    <div class="container index">
        <section class="welcome">
            <h1 class="welcome__title">{{ $t("index.welcome.title") }}</h1>
            <p class="welcome__lead">{{ $t("index.hero.subtitle") }}</p>
            <p>{{ $t("index.welcome.body_1") }}</p>
            <p>{{ $t("index.welcome.body_2") }}</p>
        </section>

        <div v-if="categories && categories.length" class="store-layout">
            <aside class="category-nav" aria-label="Categories">
                <h2 class="category-nav__title">Categories</h2>
                <ul class="category-nav__list">
                    <li
                        v-for="cat in categories"
                        :key="cat.id"
                        class="category-nav__item-wrapper"
                    >
                        <NuxtLink
                            class="category-nav__item"
                            :class="{
                                'category-nav__item--active':
                                    activeCategory?.id === cat.id,
                            }"
                            :to="{ hash: `#${titleCase(cat.name)}` }"
                            replace
                        >
                            <NuxtImg
                                v-if="cat.packages[0]?.image"
                                :src="cat.packages[0].image"
                                :alt="cat.name"
                                width="28"
                                height="28"
                                class="category-nav__icon"
                            />
                            <span>{{ cat.name }}</span>
                        </NuxtLink>
                    </li>
                </ul>
            </aside>

            <section
                v-if="activeCategory"
                class="store-content"
                :id="titleCase(activeCategory.name)"
            >
                <HeaderCard>
                    <NuxtImg
                        v-if="activeCategory.packages[0]?.image"
                        :src="activeCategory.packages[0].image"
                        :alt="activeCategory.name"
                        width="48"
                        height="48"
                        class="mr-3"
                    />
                    <h3>{{ activeCategory.name }}</h3>
                </HeaderCard>

                <div class="row">
                    <div
                        class="col-12 col-sm-6 col-lg-4"
                        v-for="pkg in activeCategory.packages"
                        :key="pkg.id"
                    >
                        <PackageCard
                            :pkg="pkg"
                            :row="activeCategory.packages.length === 1"
                            hide-options
                        />
                    </div>
                </div>
            </section>
        </div>

        <!-- Holds the login modal -->
        <NuxtPage />
    </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const route = useRoute();

useSeoMeta({
    ogTitle: t("index.hero.title"),
    description: t("index.hero.subtitle"),
    ogDescription: t("index.hero.subtitle"),
    ogImage: "/logo.png",
    twitterCard: "summary_large_image",
});

const categoryStore = useCategoryStore();
const { data: categories } = await useAsyncData("categories", () => {
    return categoryStore.fetchCategories();
});

const selectedId = ref<number | null>(null);

const activeCategory = computed(() => {
    if (!categories.value?.length) return null;
    if (selectedId.value !== null) {
        const match = categories.value.find(
            (c) => c.id === selectedId.value,
        );
        if (match) return match;
    }
    return categories.value[0];
});

const syncFromHash = (hash: string) => {
    if (!hash || !categories.value) return;
    const slug = hash.replace(/^#/, "");
    const match = categories.value.find(
        (c) => titleCase(c.name) === slug,
    );
    if (match) selectedId.value = match.id;
};

onMounted(() => syncFromHash(route.hash));
watch(() => route.hash, (h) => syncFromHash(h));
</script>

<style scoped lang="scss">
@use "~/assets/styles/settings" as *;
@use "~/assets/styles/tools";

.index {
    padding-top: 24px;
    padding-bottom: 32px;
}

.welcome {
    max-width: 720px;
    margin: 0 auto 40px;
    text-align: center;

    &__title {
        font-size: 40px;
        line-height: 1.1;
        margin-bottom: 12px;

        @include tools.media-breakpoint-up("md") {
            font-size: 52px;
        }
    }

    &__lead {
        color: $primary;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 13px;
        margin-bottom: 20px;
    }

    p {
        opacity: 0.8;
        line-height: 1.6;
        margin-bottom: 10px;
    }
}

.store-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    align-items: start;

    @include tools.media-breakpoint-up("md") {
        grid-template-columns: 240px 1fr;
        gap: 32px;
    }
}

.category-nav {
    background-color: $c-100;
    border-radius: 6px;
    padding: 16px;

    @include tools.media-breakpoint-up("md") {
        position: sticky;
        top: 24px;
    }

    &__title {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: $text-medium-emphasis-color;
        margin: 0 0 12px;
        padding: 0 8px;
    }

    &__list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    &__item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-radius: 4px;
        color: $text-high-emphasis-color;
        text-decoration: none;
        font-weight: 500;
        font-size: 14px;
        transition: background-color 0.15s ease, color 0.15s ease;

        &:hover {
            background-color: $c-200;
        }

        &--active {
            background-color: $primary;
            color: $pure-white;

            &:hover {
                background-color: $primary;
            }
        }
    }

    &__icon {
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        object-fit: cover;
        border-radius: 3px;
        background-color: $c-200;
    }
}

.store-content {
    min-width: 0;
}
</style>
