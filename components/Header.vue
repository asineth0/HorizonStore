<template>
    <div class="header" :style="{ height }">
        <div :class="classes" ref="header">
            <div class="header__shell">
                <div class="header__backdrop"></div>

                <nav class="header__nav">
                    <div class="col d-flex align-center ga-4">
                        <Button
                            v-if="appConfig.mainSiteUrl"
                            tag="a"
                            :href="appConfig.mainSiteUrl"
                            icon="home"
                            variant="clear"
                            :aria-label="$t('buttons.home')"
                        ></Button>

                        <Button
                            v-if="categories && categories.length > 3"
                            class="d-inline-flex d-lg-none"
                            icon="menu"
                            @click="uiStore.toggleItem('menu-sidebar')"
                            variant="clear"
                            :aria-label="$t('buttons.menu')"
                        ></Button>

                        <PlayButton class="d-none d-lg-inline-flex" />
                    </div>
                    <div class="col d-flex align-center justify-center">
                        <button
                            class="header__brand d-none d-md-inline-flex"
                            type="button"
                            @click="scrollToTop"
                        >
                            <img
                                class="header__logo"
                                :src="brandLogo"
                                :alt="$t('store_name')"
                            />
                            <span class="header__brand-copy">
                                <strong>{{ appConfig.storeName }}</strong>
                                <small>Wildlands SMP</small>
                            </span>
                        </button>

                        <Button
                            variant="clear"
                            class="header__logo-icon d-md-none mx-auto"
                            @click="scrollToTop"
                            :aria-label="$t('buttons.go_to_top')"
                        >
                            <img
                                :src="brandIcon"
                                :alt="$t('store_name')"
                                width="36"
                            />
                        </Button>
                    </div>
                    <div class="col d-flex justify-end align-center ga-4">
                        <ClientOnly>
                            <Button
                                class="d-none d-sm-inline-flex login-btn"
                                variant="primary"
                                :to="authStore.loginRoute"
                                ref="loginButton"
                            >
                                <template #prepend>
                                    <Avatar :user="authStore.user" />
                                </template>

                                <template #default>
                                    <span
                                        class="text-center"
                                        ref="username"
                                        :style="{ minWidth: usernameWidth }"
                                    >
                                        {{
                                            authStore.isAuthenticated
                                                ? isHovered
                                                    ? $t("buttons.logout")
                                                    : authStore.user.username
                                                : $t("buttons.login")
                                        }}
                                    </span>
                                </template>
                            </Button>
                        </ClientOnly>
                        <Button
                            class="d-none d-sm-inline-flex"
                            variant="success"
                            prependIcon="cart"
                            @click="uiStore.toggleItem('cart-sidebar')"
                        >
                            <ClientOnly :fallback="t('buttons.cart')">
                                {{
                                    t(
                                        "buttons.cart",
                                        basketStore.basket?.packages?.length ??
                                            0,
                                    )
                                }}
                            </ClientOnly>
                        </Button>

                        <!-- Mobile buttons -->
                        <ClientOnly>
                            <Button
                                class="d-inline-flex d-sm-none btn--icon"
                                variant="primary"
                                :to="authStore.loginRoute"
                                :aria-label="
                                    authStore.isAuthenticated
                                        ? isHovered
                                            ? $t('buttons.logout')
                                            : authStore.user.username
                                        : $t('buttons.login')
                                "
                            >
                                <Avatar :user="authStore.user" />
                            </Button>
                        </ClientOnly>

                        <Button
                            class="d-inline-flex d-sm-none"
                            variant="success"
                            icon="cart"
                            @click="uiStore.toggleItem('cart-sidebar')"
                            :aria-label="
                                $t(
                                    'buttons.cart',
                                    basketStore.basket?.packages?.length ?? 0,
                                )
                            "
                        >
                        </Button>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import brandIcon from "~/assets/branding/horizon-wildlands-smp-icon.png";
import brandLogo from "~/assets/branding/horizon-wildlands-smp-icon-bg.png";

const uiStore = useUIStore();
const authStore = useAuthStore();
const basketStore = useBasketStore();
const { t } = useI18n();

const loginButton = ref();
const username = ref();
const isHovered = useElementHover(loginButton);

const usernameWidth = computed(() => {
    return `${username.value?.offsetWidth ?? 0}px`;
});

const appConfig = useAppConfig();

const isSticky = ref(false);
const { y } = useWindowScroll();

watch(
    () => y.value,
    () => {
        if (y.value > 60) {
            isSticky.value = true;
        } else {
            isSticky.value = false;
        }
    },
);

const height = ref<string | undefined>();
const header = ref<HTMLDivElement | null>(null);

useResizeObserver(header, (entries) => {
    const entry = entries[0];
    height.value = `${entry.contentRect.height}px`;
});

onMounted(() => {
    height.value = header.value?.offsetHeight + "px";
});

const classes = computed(() => {
    return {
        header__container: true,
        "header__container--sticky": isSticky.value,
    };
});

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

const categoryStore = useCategoryStore();
const { data: categories } = await useAsyncData("categories", () => {
    return categoryStore.fetchCategories();
});
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;
@use "sass:map";

.header {
    $self: &;
    background-color: $header-bg;
    width: 100%;
    position: relative;
    z-index: map-get($z-index, "header");

    img {
        max-width: 100%;
        margin: 0 auto;
    }

    &__container {
        width: min(calc(100% - 24px), 1520px);
        margin: 14px auto 0;
        transition:
            transform 0.2s ease,
            background-color 0.2s ease,
            border-color 0.2s ease,
            box-shadow 0.2s ease;

        &--sticky {
            position: fixed;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: map-get($z-index, "header");
            width: min(calc(100% - 24px), 1520px);

            #{$self}__logo {
                width: 42px;
                height: 42px;
            }
        }
    }

    &__shell {
        position: relative;
        overflow: hidden;
        border-radius: 28px;
        border: 1px solid rgba(187, 140, 255, 0.14);
        background: rgba(10, 6, 16, 0.88);
        box-shadow: 0 18px 46px rgba(0, 0, 0, 0.28);
        isolation: isolate;
    }

    &__backdrop {
        position: absolute;
        inset: 0;
        opacity: 0.96;
        background: radial-gradient(
                circle at 24% 0%,
                rgba(187, 140, 255, 0.2),
                transparent 34%
            ),
            linear-gradient(
                90deg,
                rgba(13, 7, 22, 0.96) 0%,
                rgba(19, 10, 30, 0.92) 52%,
                rgba(39, 20, 62, 0.88) 100%
            );
    }

    &__nav {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 18px 22px;

        @media (max-width: 767px) {
            padding: 14px 16px;
            gap: 12px;
        }
    }

    &__brand {
        display: inline-flex;
        align-items: center;
        gap: 14px;
        padding: 12px 16px;
        border: 0;
        background: rgba(15, 10, 24, 0.8);
        border-radius: 9999px;
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
        backdrop-filter: blur(14px);
        cursor: pointer;
    }

    &__logo {
        width: 48px;
        height: 48px;
        object-fit: cover;
        border-radius: 16px;

        &-icon img {
            border-radius: 12px;
        }
    }

    &__brand-copy {
        display: grid;
        text-align: left;
        line-height: 1.15;

        strong {
            font-family: $heading-font-family;
            font-size: 0.98rem;
            color: $c-900;
        }

        small {
            color: $c-700;
        }
    }
}
</style>
