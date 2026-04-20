<template>
    <Hero
        :title="$t('index.hero.title')"
        :subtitle="$t('index.hero.subtitle')"
        :image="heroBackground"
        class="mb-10"
    />

    <div class="container storefront">
        <section v-if="categories?.length" class="storefront__intro mb-8">
            <div>
                <span class="storefront__eyebrow">Store categories</span>
                <h2>Choose the upgrades that fit your playstyle</h2>
                <p>
                    Every purchase supports Horizon while keeping checkout and
                    delivery handled through Tebex.
                </p>
            </div>
            <div v-if="categories.length > 3" class="storefront__chips">
                <NuxtLink
                    v-for="category in categories"
                    :key="category.id"
                    class="storefront__chip"
                    :to="{ hash: `#${titleCase(category.name)}` }"
                >
                    {{ category.name }}
                </NuxtLink>
            </div>
        </section>

        <div
            v-if="categories && categories.length > 3"
            class="row justify-center storefront__categories"
        >
            <div
                class="col-auto"
                v-for="category in categories"
                :key="category.id"
            >
                <NuxtLink
                    class="category-link"
                    tag="a"
                    :to="{
                        hash: `#${titleCase(category.name)}`,
                    }"
                >
                    <CategoryCard
                        :image="category.packages[0].image"
                        :category="category"
                    />
                </NuxtLink>
            </div>
        </div>

        <div class="d-flex my-6 w-100"></div>

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

                <h3>{{ category.name }}</h3>
            </HeaderCard>

            <div class="row">
                <div
                    class="col-12 col-sm-6 col-md-4 col-lg-3"
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
.category {
    margin-bottom: 52px;

    :deep(.header-card) {
        padding: 0 28px;
        box-shadow: var(--horizon-shadow);
        border: 1px solid var(--horizon-border);
    }

    &-link {
        text-decoration: none;
    }
}

.storefront {
    position: relative;
    z-index: 1;

    &__intro {
        display: grid;
        gap: 20px;
        padding: 0 8px;

        h2 {
            margin-bottom: 10px;
        }

        p {
            margin-bottom: 0;
            max-width: 48rem;
        }
    }

    &__eyebrow {
        display: inline-flex;
        margin-bottom: 14px;
        padding: 8px 14px;
        border-radius: 9999px;
        background: rgba(237, 226, 255, 0.85);
        color: #6c46a8;
        font-size: 0.82rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    &__chips {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

    &__chip {
        padding: 12px 18px;
        border-radius: 9999px;
        background: rgba(255, 255, 255, 0.74);
        border: 1px solid rgba(120, 89, 164, 0.12);
        color: #563c6d;
        text-decoration: none;
        transition:
            transform 0.2s ease,
            background-color 0.2s ease,
            border-color 0.2s ease;

        &:hover {
            transform: translateY(-2px);
            background: rgba(237, 226, 255, 0.94);
            border-color: rgba(120, 89, 164, 0.22);
        }
    }
}
</style>
