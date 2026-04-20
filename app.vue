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
        rgba(207, 183, 255, 0.72),
        rgba(207, 183, 255, 0)
    );
    --horizon-panel: rgba(255, 255, 255, 0.78);
    --horizon-border: rgba(120, 89, 164, 0.16);
    --horizon-shadow: 0 24px 80px rgba(82, 46, 128, 0.12);
}

html {
    background: #f7f2ff;
    scroll-behavior: smooth;
}

body {
    background: radial-gradient(
            circle at top left,
            rgba(213, 192, 255, 0.62),
            transparent 32%
        ),
        radial-gradient(
            circle at top right,
            rgba(238, 229, 255, 0.9),
            transparent 28%
        ),
        linear-gradient(180deg, #fbf9ff 0%, #f3ecfe 52%, #f7f2ff 100%);
    color: #5d4775;
}
</style>
