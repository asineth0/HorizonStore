<template>
    <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
    </Head>

    <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
        <Toast />
    </ClientOnly>
</template>

<script lang="ts" setup>
import "~/assets/styles/main.scss";
import { isClient } from "@vueuse/core";

const appConfig = useAppConfig();

useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk
            ? `${titleChunk} | ${appConfig.titlePrefix}`
            : appConfig.titlePrefix;
    },
});

const webstoreStore = useWebstoreStore();

const { data: webstore } = await useAsyncData("webstore", () =>
    webstoreStore.fetchWebstore(),
);

const { setNumberFormat, locale } = useI18n();

watchEffect(() => {
    if (!webstore.value) return;

    setNumberFormat(locale.value, {
        currency: {
            style: "currency",
            notation: "standard",
            currency: webstore.value?.currency ?? "USD",
        },
    });
});

const authStore = useAuthStore();
const toastStore = useToastStore();
const route = useRoute();
const router = useRouter();

if (route.query.success && isClient) {
    try {
        await authStore.loginCompleted();

        if (route.query.redirect) {
            await router.push(route.query.redirect as string);
        }

        toastStore.addToast("You have been successfully logged in.", {
            type: "success",
        });
    } catch (error) {
        toastStore.addToast(error as string, {
            type: "error",
        });
    }
}
</script>

<style lang="scss">
:root {
    --horizon-glow: radial-gradient(
        circle at top,
        rgba(124, 86, 196, 0.36),
        rgba(124, 86, 196, 0)
    );
    --horizon-panel: rgba(20, 12, 30, 0.88);
    --horizon-border: rgba(187, 140, 255, 0.14);
    --horizon-shadow: 0 28px 90px rgba(0, 0, 0, 0.34);
    --horizon-ease: cubic-bezier(0.45, 0, 0.2, 1);
    --horizon-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
    --horizon-ease-soft: cubic-bezier(0.4, 0, 0.2, 1);
    --horizon-motion-fast: 90ms;
    --horizon-motion-base: 160ms;
    --horizon-motion-slow: 310ms;
}

html {
    background: #090510;
    scroll-behavior: smooth;
}

body {
    background: radial-gradient(
            circle at top left,
            rgba(113, 74, 186, 0.26),
            transparent 32%
        ),
        radial-gradient(
            circle at top right,
            rgba(75, 48, 122, 0.24),
            transparent 28%
        ),
        linear-gradient(180deg, #0d0714 0%, #090510 52%, #050309 100%);
    color: #c3aedf;
}
</style>
