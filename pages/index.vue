<template>
    <Hero
        :title="$t('index.hero.title')"
        :subtitle="$t('index.hero.subtitle')"
        :image="heroBackground"
        class="mb-8"
    />

    <div class="container storefront">
        <aside
            v-if="categories?.length"
            class="storefront__sidebar d-none d-lg-block"
        >
            <div class="storefront__sidebar-inner">
                <span class="storefront__sidebar-label">Categories</span>

                <NuxtLink
                    v-for="category in categories"
                    :key="category.id"
                    class="storefront__sidebar-link"
                    :to="{ hash: `#${titleCase(category.name)}` }"
                >
                    <NuxtImg
                        v-if="category.packages[0].image"
                        :src="category.packages[0].image"
                        :alt="category.name"
                        width="48"
                        height="48"
                    />
                    <span>{{ category.name }}</span>
                </NuxtLink>
            </div>
        </aside>

        <div class="storefront__content">
            <div
                v-for="category in categories"
                :key="category.id"
                :id="titleCase(category.name)"
                class="category"
            >
                <HeaderCard>
                    <NuxtImg
                        :src="category.packages[0].image"
                        :alt="category.name"
                        width="60px"
                        class="mr-3"
                    />

                    <div class="category__heading">
                        <h3>{{ category.name }}</h3>
                        <small>
                            {{ category.packages.length }}
                            {{
                                category.packages.length === 1
                                    ? "item"
                                    : "items"
                            }}
                        </small>
                    </div>
                </HeaderCard>

                <div class="row">
                    <div
                        class="col-12 col-sm-6 col-xl-4"
                        v-for="pkg in category.packages"
                        :key="pkg.id"
                    >
                        <PackageCard
                            :pkg="pkg"
                            :row="category.packages.length === 1"
                            hide-options
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Holds the login modal -->
    <NuxtPage />
</template>

<script lang="ts" setup>
import brandMark from "~/assets/branding/horizon-wildlands-smp-icon-bg.png";
import heroBackground from "~/assets/branding/hero-bg.png";

const { t } = useI18n();

useSeoMeta({
    ogTitle: t("index.hero.title"),
    description: t("index.hero.subtitle"),
    ogDescription: t("index.hero.subtitle"),
    ogImage: brandMark,
    twitterCard: "summary_large_image",
});

const categoryStore = useCategoryStore();
const { data: categories } = await useAsyncData("categories", () => {
    return categoryStore.fetchCategories();
});
</script>

<style scoped lang="scss">
@use "~/assets/styles/tools";

.category {
    margin-bottom: 48px;
    animation: store-reveal var(--horizon-motion-slow)
        var(--horizon-ease-in-out) both;

    :deep(.header-card) {
        padding: 16px 24px;
        box-shadow: var(--horizon-shadow);
        border: 1px solid var(--horizon-border);
    }

    &__heading {
        display: grid;
        gap: 4px;

        small {
            color: #a88ad0;
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }
    }
}

.storefront {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 28px;

    @include tools.media-breakpoint-up("lg") {
        grid-template-columns: 260px minmax(0, 1fr);
        align-items: start;
    }

    &__content {
        min-width: 0;
    }

    &__sidebar {
        position: sticky;
        top: 110px;
    }

    &__sidebar-inner {
        display: grid;
        gap: 12px;
        padding: 20px;
        border-radius: 28px;
        background: var(--horizon-panel);
        border: 1px solid var(--horizon-border);
        box-shadow: var(--horizon-shadow);
    }

    &__sidebar-label {
        color: #b293de;
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    &__sidebar-link {
        display: grid;
        grid-template-columns: 48px minmax(0, 1fr);
        align-items: center;
        gap: 14px;
        padding: 10px 12px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(187, 140, 255, 0.08);
        color: #efe3ff;
        text-decoration: none;
        transition:
            transform var(--horizon-motion-base) var(--horizon-ease-in-out),
            background-color var(--horizon-motion-base)
                var(--horizon-ease-in-out),
            border-color var(--horizon-motion-base) var(--horizon-ease-in-out);

        img {
            border-radius: 14px;
            object-fit: cover;
        }

        &:hover {
            transform: translateX(3px);
            background: rgba(187, 140, 255, 0.08);
            border-color: rgba(187, 140, 255, 0.2);
        }
    }
}

@keyframes store-reveal {
    from {
        opacity: 0;
        transform: translateY(12px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
