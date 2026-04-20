<template>
    <div class="layout layout--default">
        <div class="layout__sky"></div>
        <Header />

        <MenuSidebar />

        <CartSidebar />

        <div class="w-100 container--fluid">
            <slot />
        </div>

        <Footer />
    </div>
</template>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.layout {
    position: relative;
    overflow: clip;

    &__sky {
        position: fixed;
        inset: 0 0 auto;
        z-index: 0;
        height: min(96vh, 980px);
        pointer-events: none;
        background-image: linear-gradient(
                180deg,
                rgba(8, 9, 12, 0.12) 0%,
                rgba(10, 11, 15, 0.36) 52%,
                #0c0d10 100%
            ),
            url("~/assets/branding/night-sky.png");
        background-position: center top;
        background-size: cover;
        opacity: 0.66;
        mask-image: linear-gradient(
            180deg,
            #000 0%,
            rgba(0, 0, 0, 0.92) 52%,
            transparent 100%
        );
        transform: translateZ(0);
    }

    &--default {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        min-height: 100vh;
        isolation: isolate;
    }
}
</style>
