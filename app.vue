<template>
    <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="48x48"
            href="/favicon-48x48.png"
        />
        <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0b0c0f" />
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
    --horizon-panel: rgba(22, 24, 29, 0.72);
    --horizon-border: rgba(255, 255, 255, 0.07);
    --horizon-shadow: 0 24px 70px rgba(0, 0, 0, 0.36);
    --horizon-ease: cubic-bezier(0.45, 0, 0.2, 1);
    --horizon-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
    --horizon-ease-soft: cubic-bezier(0.4, 0, 0.2, 1);
    --horizon-motion-fast: 90ms;
    --horizon-motion-base: 160ms;
    --horizon-motion-slow: 310ms;
}

html {
    background: #0b0c0f;
    scroll-behavior: smooth;
}

body {
    background: linear-gradient(180deg, #101116 0%, #0c0d10 48%, #08090b 100%);
    color: #c9cbd1;
}
</style>
